pragma solidity >= 0.7.0 < 0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract LPTokenMockup is ERC20, Ownable {

    constructor(string memory name_, string memory symbol_) public ERC20(name_, symbol_) {}

    /// @notice Creates `_amount` token to `_to`. Must only be called by the owner
    function mint(address _to, uint256 _amount) public onlyOwner {
        _mint(_to, _amount);
    }

}