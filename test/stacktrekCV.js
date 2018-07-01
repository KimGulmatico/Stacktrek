const StacktrekCV = artifacts.require('StacktrekCV');

contract('Stacktrek CV', async (accounts) => {
  const owner = accounts[0]
  const endorser = accounts[1]

  it('should insert user', async () => {
    const firstname = 'Kim Benedict'
    const lastname = 'Gulmatico'
    let instance = await StacktrekCV.deployed()
    await instance.insertUser(firstname, lastname, {from: owner})
    const userInfo = await instance.getUserInfo(owner)
    assert.equal(web3.toUtf8(userInfo[0]), firstname, 'Should equal to firstname')
    assert.equal(web3.toUtf8(userInfo[1]), lastname, 'Should equal to lastname')
  })

  it('should create endorser account and endorse owner skill', async () => {
    const firstname = 'li Arolf'
    const lastname = 'Rey'
    const skill = 'Solidity'
    const endorsersCount = '1';
    let instance = await StacktrekCV.deployed()
    await instance.insertUser(firstname, lastname, {from: endorser})

    await instance.insertUserSkill(owner, skill, {from: endorser})
    let userSkills = await instance.getUserSkillByName(owner, skill)
    assert.equal(web3.toUtf8(userSkills[0]), skill, 'Should equal to skill')
    assert.equal(userSkills[1], endorsersCount, 'Should equal to endorsers count')
    assert.equal(userSkills[2][0], endorser, 'Should equal to endorsers address')
  })

  it('should endorse owner experience', async () => {
    const title = 'Developer'
    const company = 'Gulmatico'
    const dateFrom = 1526938244215
    const dateTo = 1527184694714
    const indexOfExperience = 0;
    let instance = await StacktrekCV.deployed()
    await instance.insertUserExperience(owner, title, company, dateFrom, dateTo, {from: endorser})

    let userExperience = await instance.getUserExperience(owner, indexOfExperience)
    assert.equal(web3.toUtf8(userExperience[0]), title, 'Should equal to title')
    assert.equal(web3.toUtf8(userExperience[1]), company, 'Should equal to company')
    assert.equal(userExperience[2], dateFrom, 'Should equal to date from')
    assert.equal(userExperience[3], dateTo, 'Should equal to date to')
    assert.equal(userExperience[4][0], endorser, 'Should equal to endorsers address')

  })
  
  //For Stack League admin only
  it('should add league event', async () => {
    const name = 'Soft Uni Event'
    const examprovider = 'Soft Uni'
    const indexOfLeague = 0;
    let instance = await StacktrekCV.deployed()
    await instance.addLeague(name, examprovider, {from: owner})

    let league = await instance.getLeague(indexOfLeague)
    assert.equal(web3.toUtf8(league[0]), name, 'Should equal to league name')
    assert.equal(web3.toUtf8(league[1]), examprovider, 'Should equal to exam provider')

  })

  //For Stack League admin only, for security purposes of the contract
  //Allowing an address to insert result on soft uni exam
  it('should allow endorser to insert result', async () => {
    const eventIndex = 0
    let addressToAllow = endorser
    let instance = await StacktrekCV.deployed()
    await instance.allowUserToInsertResult(eventIndex, addressToAllow, {from: owner})

    let result = await instance.checkUserHasResult(eventIndex, addressToAllow)
    assert.equal(result, true, 'Should be true')

  })

  it('should insert user league result', async () => {
    const name = 'Soft Uni Event'
    const examprovider = 'Soft Uni'
    const eventIndex = 0
    const addressAllowed = endorser

    const result = '400/400'
    const certIpfsHash = 'Qmb48N6LFdWaMAWnp2m2z75ijaR1xV3NEV3xUXkL7GGTwG'
    
    let instance = await StacktrekCV.deployed()
    await instance.insertUserLeagueResult(eventIndex, result, certIpfsHash, {from: addressAllowed})

    let leagueResult = await instance.getUserLeagueResults(eventIndex, addressAllowed)
    assert.equal(web3.toUtf8(leagueResult[0]), name, 'Should equal to league name')
    assert.equal(web3.toUtf8(leagueResult[1]), examprovider, 'Should equal to exam provider')
    assert.equal(web3.toUtf8(leagueResult[2]), result, 'Should equal to result')
    assert.equal(web3.toUtf8(leagueResult[3]), certIpfsHash, 'Should equal to certificate hash')

  })

})
