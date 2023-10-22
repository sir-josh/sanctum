//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { AxelarExecutable } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import { IAxelarGateway } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import { IERC20 } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";
import { IAxelarGasService } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";
import "./ISanctumBadge.sol";

contract Sanctum is AxelarExecutable {
  IAxelarGasService public immutable gasService;
  address public owner;
  address public aUSDC;

  ISanctumBadge public verificationBadge;

  struct Organization {
    string id;
    address owner;
    uint256 joined;
    uint256 totalRaised;
    bool isActive;
    bool isVerified;
  }

  struct Campaign {
    string org;
    string id;
    uint256 target;
    uint256 raised;
    uint256 deadline;
    bool isActive;
  }

  struct Donor {
    address donor;
    uint256 amount;
    uint256 date;
  }

  //stores organizations
  mapping(string => Organization) public orgs;

  //stores campaigns
  mapping(string => Campaign) public campaigns;

  //holds all campaign records belonging to an organization
  mapping(string => Campaign[]) public orgCampaigns;

  //holds all donors to a particular campaign
  mapping(string => Donor[]) public campaignDonors;

  constructor(
    address gateway_,
    address gasReceiver_,
    address _aUSDC
  ) AxelarExecutable(gateway_) {
    gasService = IAxelarGasService(gasReceiver_);
    owner = msg.sender;
    aUSDC = _aUSDC;
  }

  modifier onlyOwner() {
    require(msg.sender == owner, "Not owner");
    _;
  }

  function registerOrg(string calldata _id) external {
    orgs[_id] = Organization({
      id: _id,
      owner: msg.sender,
      joined: block.timestamp,
      totalRaised: 0,
      isActive: false,
      isVerified: false
    });
  }

  function approveOrg(string calldata _org) external onlyOwner {
    Organization storage organization = orgs[_org];
    organization.isActive = true;
  }

  function createCampaign(
    string calldata _orgId,
    string calldata _campaignId,
    uint256 _target,
    uint256 _deadline
  ) external {
    Organization memory org = orgs[_orgId];

    require(org.isActive == true, "Inactive organization");

    //create campaign
    campaigns[_campaignId] = Campaign({
      id: _campaignId,
      org: _orgId,
      target: _target,
      raised: 0,
      deadline: _deadline,
      isActive: true
    });

    //record in organization
    orgCampaigns[_orgId].push(
      Campaign({
        id: _campaignId,
        org: _orgId,
        target: _target,
        raised: 0,
        deadline: _deadline,
        isActive: true
      })
    );
  }

  //for users donating on sanctum chain
  function donateToCampaign(string memory _campaignId, uint256 _amount) public {
    Campaign storage campaign = campaigns[_campaignId];

    require(campaign.isActive == true, "Invalid campaign");

    IERC20(aUSDC).transferFrom(msg.sender, address(this), _amount);

    unchecked {
      campaign.raised = campaign.raised + _amount;
    }

    //update donor list
    campaignDonors[_campaignId].push(
      Donor({ donor: msg.sender, amount: _amount, date: block.timestamp })
    );
  }

  //get all campaigns for an organization
  function getOrgCampaigns(
    string calldata _orgId
  ) external view returns (Campaign[] memory) {
    Campaign[] memory camps = new Campaign[](orgCampaigns[_orgId].length);
    for (uint256 i = 0; i < orgCampaigns[_orgId].length; i++) {
      camps[i] = orgCampaigns[_orgId][i];
    }

    return camps;
  }

  //get all donors for a campaign
  function getCampaignDonors(
    string calldata _campaignId
  ) external view returns (Donor[] memory) {
    Donor[] memory donors = new Donor[](campaignDonors[_campaignId].length);
    for (uint256 i = 0; i < campaignDonors[_campaignId].length; i++) {
      donors[i] = campaignDonors[_campaignId][i];
    }

    return donors;
  }

  function verifyOrg(string calldata _orgId) external {
    Organization storage org = orgs[_orgId];
    require(org.isActive, "Not Active");
    require(!org.isVerified, "Already verified");
    require(org.owner == msg.sender, "Not permitted");

    //call verification contract to mint badge
    verificationBadge.safeMint(org.owner);
    org.isVerified = true;
  }

  function withdrawDonation(string calldata _campaignId) external {
    Campaign storage campaign = campaigns[_campaignId];
    Organization storage org = orgs[campaign.org];

    require(campaign.isActive == true, "Organisation inactive");
    require(campaign.raised > 0, "Insufficient funds");
    require(org.owner == msg.sender, "Permission denied");

    //transfers donations
    IERC20(aUSDC).transfer(msg.sender, campaign.raised);

    //deactivate campaign
    campaign.isActive = false;

    //update org total raised
    org.totalRaised = org.totalRaised + campaign.raised;
  }

  //users donating from terminal chains
  function _executeWithToken(
    string calldata,
    string calldata,
    bytes calldata payload,
    string calldata tokenSymbol,
    uint256 amount
  ) internal override {
    (address donor, string memory campaignId) = abi.decode(
      payload,
      (address, string)
    );
    address tokenAddress = gateway.tokenAddresses(tokenSymbol);
    IERC20(tokenAddress).transfer(address(this), amount);

    //interchain donation
    Campaign storage campaign = campaigns[campaignId];

    campaign.raised = campaign.raised + amount;

    //update donor list
    campaignDonors[campaignId].push(
      Donor({ donor: donor, amount: amount, date: block.timestamp })
    );
  }

  function setVerificationBadge(address _badgeAddr) external onlyOwner {
    verificationBadge = ISanctumBadge(_badgeAddr);
  }
}

//celo
// gateway 0xe432150cce91c13a887f7D836923d5597adD8E31
// service 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6
// aUSDC 0x254d06f33bDc5b8ee05b2ea472107E300226659A
// 0xe56e24249d62473F8a4d237E3504b5Eec2116B6e

//ftm
// gateway 0x97837985Ec0494E7b9C71f5D3f9250188477ae14
// service 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6
