pragma solidity  ^0.4.24;

import 'openzeppelin-solidity/contracts/ownership/Ownable.sol';

contract StacktrekCV is Ownable {
  
  event OnInsertUser(address _from, bytes32 _fname, bytes32 _lname);
  event OnInsertUserSkill(address _from, address _to, bytes32 _name, uint endorsements);
  event OnInsertUserExperience(address _from, address _to, bytes32 _title, bytes32 _company, uint256 _dateFrom, uint256 _dateTo);
  event OnAddLeague(bytes32 _name, bytes32 _examProvider);
  event OnAllowUserToInsertResult(uint eventIndex, address _adrs);
  event OnInsertUserLeagueResult(uint _eventIndex, bytes32 _result, bytes _certificateHash);
  
  struct User {
    bytes32 fname;
    bytes32 lname;
    bytes32[] skillList;
    mapping(bytes32 => Skills) skills;
    bytes32[] companyList;
    bytes32[] titleList;
    mapping(bytes32 => mapping(bytes32 => Experience)) experience;
    bytes32[] certList;
    mapping(uint => LeagueResult) leagueResults;
  }
  
  struct Skills{
    bytes32 name;
    mapping(address => bool) endorsers;
    address[] endorserslist;
  }
  
  struct Experience {
    bytes32 title;
    bytes32 company;
    uint256 dateFrom;
    uint256 dateTo;
    mapping(address => bool) endorsers;
    address[] endorserslist;
  }
  
  struct LeagueResult {
      bytes32 name;
      bytes32 examProvider;
      bytes32 result;
      bytes certificateHash;
  }
  
  struct League {
      bytes32 name;
      bytes32 examProvider;
      mapping(address => bool) hasResult;
  }
  
  mapping(address => bool) registered;
  mapping(address => User) users;
  League[] league;
  
  function insertUser(bytes32 _fname, bytes32 _lname) public {
    users[msg.sender].fname = _fname;
    users[msg.sender].lname = _lname;
    
    registered[msg.sender] = true;
    
    emit OnInsertUser(msg.sender, _fname, _lname);
  }
  
  function getUserInfo(address _adrs) public view returns (bytes32, bytes32){
    return (users[_adrs].fname, users[_adrs].lname);
  }
  
  modifier registeredOnly(address _from, address _to) {
    require(registered[_from]);
        require(registered[_to]);
            require(_from != _to);
    _;
  }
  
  function insertUserSkill(address _to, bytes32 _name) public registeredOnly(msg.sender, _to) {
    address endorser = msg.sender;
    bool skillDontExist = (users[_to].skills[_name].name == 0x0);
    
    if(skillDontExist){
        users[_to].skillList.push(_name);
    }
    
    address[] storage endorserslist = users[_to].skills[_name].endorserslist;
    
    Skills memory skills = Skills(_name, endorserslist);
    users[_to].skills[_name] = (skills);
    
    bool endorserDontExist = (!users[_to].skills[_name].endorsers[endorser]);
    
    if(endorserDontExist) {
        users[_to].skills[_name].endorserslist.push(endorser);
        users[_to].skills[_name].endorsers[endorser] = true;
    }
    
    uint endorsments = users[_to].skills[_name].endorserslist.length;
        
    emit OnInsertUserSkill(endorser, _to, _name, endorsments);
    
  }
  
  function getUserSkillByIndex(address _adrs, uint _i) public view returns (bytes32, uint, address[]) {
    bytes32 skillName = users[_adrs].skillList[_i];
    return (skillName, 
            users[_adrs].skills[skillName].endorserslist.length,
            users[_adrs].skills[skillName].endorserslist);
  }

  function getUserSkillByName(address _adrs, bytes32 _name) public view returns (bytes32, uint, address[]) {
    return (users[_adrs].skills[_name].name, 
            users[_adrs].skills[_name].endorserslist.length,
            users[_adrs].skills[_name].endorserslist);
  }
  
  function getUserSkillEndorsers(address _adrs, bytes32 _name, uint _i) public view  returns (address) {
    return users[_adrs].skills[_name].endorserslist[_i];
  }
  
  function getUserSkillLength(address _adrs) public view returns(uint) {
    return users[_adrs].skillList.length;
  }

  function insertUserExperience(address _to, bytes32 _title, bytes32 _company, uint256 _dateFrom, uint256 _dateTo) public registeredOnly(msg.sender, _to) {
    address endorser = msg.sender;
    bool companyTitleDontExist = (users[_to].experience[_company][_title].title == 0x0);
    
    if(companyTitleDontExist) {
        users[_to].titleList.push(_title);
        users[_to].companyList.push(_company);
    }
    
    address[] memory endorserslist = users[_to].experience[_company][_title].endorserslist;
    
    Experience memory experience = Experience(_title, _company, _dateFrom, _dateTo, endorserslist);
    users[_to].experience[_company][_title] = experience;
    
    bool endorserDontExist = (!users[_to].experience[_company][_title].endorsers[endorser]);
    
    if(endorserDontExist) {
        users[_to].experience[_company][_title].endorserslist.push(endorser);
        users[_to].experience[_company][_title].endorsers[endorser] = true;
    }
    
    emit OnInsertUserExperience(msg.sender, _to, _title, _company, _dateFrom, _dateTo);
    
  }
  
  function getUserExperience(address _adrs, uint _i) public view returns (bytes32, bytes32, uint256, uint256, address[]){
    bytes32 tempTitle = users[_adrs].titleList[_i];
    bytes32 tempCompany= users[_adrs].companyList[_i];
    return(
        users[_adrs].experience[tempCompany][tempTitle].title, 
        users[_adrs].experience[tempCompany][tempTitle].company, 
        users[_adrs].experience[tempCompany][tempTitle].dateFrom, 
        users[_adrs].experience[tempCompany][tempTitle].dateTo,
        users[_adrs].experience[tempCompany][tempTitle].endorserslist
    );
  }
  
  function getUserExperienceLength(address _adrs) public view returns(uint) {
    uint userExpLen = users[_adrs].titleList.length;
    return userExpLen;
  }
  
  function addLeague(bytes32 _name, bytes32 _examProvider) public onlyOwner {
    League memory lg = League(_name, _examProvider);
    league.push(lg);
      
    emit OnAddLeague(_name, _examProvider);
  }
  
  function getLeague(uint i) public view returns (bytes32, bytes32) {
      return (league[i].name, league[i].examProvider);
  }
  
  function getLeagueLength() public view returns (uint) {
      return league.length;
  }
  
  modifier registeredOnlySolo (address _adrs) {
    require(registered[_adrs]);
    _;
  }
  
  function allowUserToInsertResult(uint _eventIndex, address _adrs) public onlyOwner registeredOnlySolo(_adrs) {
    league[_eventIndex].hasResult[_adrs] = true;
    
    emit OnAllowUserToInsertResult(_eventIndex, _adrs);
  }
  
  function checkUserHasResult(uint _eventIndex, address _adrs) public view returns (bool) {
    return (league[_eventIndex].hasResult[_adrs]);
  }
  
  modifier hasResultOnly(uint _eventIndex) {
    require(league[_eventIndex].hasResult[msg.sender]);
    _;
  }
  
  function insertUserLeagueResult(uint _eventIndex, bytes32 _result, bytes _certificateHash) public registeredOnlySolo(msg.sender) hasResultOnly(_eventIndex) {
    bytes32 leagueName = league[_eventIndex].name;
    bytes32 examProvider = league[_eventIndex].examProvider;
    LeagueResult memory lr = LeagueResult(leagueName, examProvider, _result, _certificateHash);
    users[msg.sender].leagueResults[_eventIndex] = lr;
    
    emit OnInsertUserLeagueResult(_eventIndex, _result, _certificateHash);
  }
  
  function getUserLeagueResults(uint _eventIndex, address _adrs) public view returns (bytes32, bytes32, bytes32, bytes) {
    return (users[_adrs].leagueResults[_eventIndex].name, 
            users[_adrs].leagueResults[_eventIndex].examProvider,
            users[_adrs].leagueResults[_eventIndex].result,
            users[_adrs].leagueResults[_eventIndex].certificateHash);
  }
  
  function kill() public onlyOwner {
    selfdestruct(owner);
  }
   
}
