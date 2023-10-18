//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { AxelarExecutable } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import { IAxelarGateway } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import { IERC20 } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";
import { IAxelarGasService } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

contract Sanctum is AxelarExecutable {
  IAxelarGasService public immutable gasService;
  address public owner;
  address public aUSDC;
  struct Organization {
    string id;
    address owner;
    uint joined;
    uint totalRaised;
    bool isActive;
    bool isVerified;
  }

  struct Campaign {
    string org;
    string id;
    uint target;
    uint raised;
    uint deadline;
    bool isActive;
  }

  struct Donor {
    address donor;
    uint amount;
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

    //todo: mint soulbound NFT to owner
  }

  function createCampaign(
    string calldata _orgId,
    string calldata _campaignId,
    uint _target,
    uint _deadline
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
  function donateToCampaign(string memory _campaignId, uint _amount) public {
    Campaign storage campaign = campaigns[_campaignId];

    require(campaign.isActive == true, "Invalid campaign");

    IERC20(aUSDC).transferFrom(msg.sender, address(this), _amount);
    campaign.raised = campaign.raised + _amount;

    //loop thru n check
    //update donor list
    campaignDonors[_campaignId].push(
      Donor({ donor: msg.sender, amount: _amount })
    );
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
    campaignDonors[campaignId].push(Donor({ donor: donor, amount: amount }));
  }
}

//celo
// gateway 0xe432150cce91c13a887f7D836923d5597adD8E31
// service 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6
// 0xe56e24249d62473F8a4d237E3504b5Eec2116B6e

//ftm
// gateway 0x97837985Ec0494E7b9C71f5D3f9250188477ae14
// service 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6
