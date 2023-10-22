//SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import { AxelarExecutable } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/executable/AxelarExecutable.sol";
import { IAxelarGateway } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGateway.sol";
import { IERC20 } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IERC20.sol";
import { IAxelarGasService } from "@axelar-network/axelar-gmp-sdk-solidity/contracts/interfaces/IAxelarGasService.sol";

contract Terminal is AxelarExecutable {
  IAxelarGasService public immutable gasService;

  constructor(
    address gateway_,
    address gasReceiver_
  ) AxelarExecutable(gateway_) {
    gasService = IAxelarGasService(gasReceiver_);
  }

  //donate to source
  function donateToCampaign(
    string memory destinationChain,
    string memory destinationAddress,
    string memory symbol,
    uint256 amount,
    string memory campaignId
  ) external payable {
    require(msg.value > 0, "Gas payment is required");
    address tokenAddress = gateway.tokenAddresses(symbol);
    IERC20(tokenAddress).transferFrom(msg.sender, address(this), amount);
    IERC20(tokenAddress).approve(address(gateway), amount);
    bytes memory payload = abi.encode(msg.sender, campaignId);
    gasService.payNativeGasForContractCallWithToken{ value: msg.value }(
      address(this),
      destinationChain,
      destinationAddress,
      payload,
      symbol,
      amount,
      msg.sender
    );
    gateway.callContractWithToken(
      destinationChain,
      destinationAddress,
      payload,
      symbol,
      amount
    );
  }
}

//ftm
// gateway 0x97837985Ec0494E7b9C71f5D3f9250188477ae14
// service 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6
// 0xf0C4E5c36aE71CE13624a7af8812A9216b76Ac6B

//celo
// gateway 0xe432150cce91c13a887f7D836923d5597adD8E31
// service 0xbE406F0189A0B4cf3A05C286473D23791Dd44Cc6
