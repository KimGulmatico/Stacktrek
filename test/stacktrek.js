const Stacktrek = artifacts.require('StacktrekCV')

contract.skip('Stacktrek', async (accounts) => {
  const owner = accounts[0]
  let stacktrek

  beforeEach('Setup new contract before each test', async () => {
    stacktrek = await Stacktrek.new(owner)
  })

  describe('insertUser', () => {
    it('Should add first name and last name of user', async () => {
      const firstname = 'li arolf'
      const lastname = 'rey'
      await stacktrek.insertUser(firstname, lastname)
      const userInfo = await stacktrek.getUserInfo('0x627306090abaB3A6e1400e9345bC60c78a8BEf57')
      assert.equal(web3.toUtf8(userInfo[0]), firstname, 'Should equal firstname')
      assert.equal(web3.toUtf8(userInfo[1]), lastname, 'Should equal firstname')
    })
  })

  describe('insertUserSkill', () => {
    it('Should insert user skill', async () => {
      await stacktrek.insertUser('li arolf', 'rey')
      const skill = 'Java'
      await stacktrek.insertUserSkill(accounts[0], skill)
      const res = await stacktrek.getUserSkillByName(accounts[0], skill)
      assert.equal(web3.toUtf8(res[0]), skill, 'Should equal skill name')
    })
  })

  describe('insertUserExperience', () => {
    it('Should insert user experience', async () => {
      const title = 'Software Engineer'
      const company = 'Stacktrek'
      const dateFrom = 1526938244215
      const dateTo = 1527184694714
      await stacktrek.insertUser('li arolf', 'rey')
      await stacktrek.insertUserExperience(accounts[0], title, company, dateFrom, dateTo)
      const res = await stacktrek.getUserExperience(accounts[0], 0)
      assert.equal(web3.toUtf8(res[0]), title, 'Should equal title')
      assert.equal(web3.toUtf8(res[1]), company, 'Should equal company')
      assert.equal(res[2].toNumber(), dateFrom, 'Should equal date from')
      assert.equal(res[3].toNumber(), dateTo, 'Should equal date from')
    })
  })

  // describe('endorseUserSkill', () => {
  //   it('Should add the sender address as the endorser of the skill', async () => {
  //     const endorsee = accounts[0]
  //     const endorser1 = accounts[1]
  //     const endorser2 = accounts[2]
  //     await stacktrek.insertUser('li arolf', 'rey', { from: endorsee })
  //     await stacktrek.insertUser('addy', 'palma', { from: endorser1 })
  //     await stacktrek.insertUser('kenneth', 'so', { from: endorser2 })
  //     const skill = 'Java'
  //     await stacktrek.endorseUserSkill(endorsee, skill, { from: endorser1 })
  //     await stacktrek.endorseUserSkill(endorsee, skill, { from: endorser2 })
  //     const res = await stacktrek.getUserSkills(endorsee, skill)
  //     assert.equal(res[2][0], endorser1)
  //     assert.equal(res[2][1], endorser2)
  //     assert.equal(res[2].length, 2)
  //   })
  // })
})
