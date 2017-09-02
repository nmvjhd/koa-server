const router = require('koa-router')();

const User = require('../data/users');

const users = new User();

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'user info manager interface';
})

router.get('/infos',async (ctx,next) =>{
  let users = await users.gets();
  console.log(users);
  await ctx.render('users',{
    data:users,
  })
})

router.delete('/infos',async (ctx,next) => {
    await users.clear();
    ctx.body = 'clear success';
})

router.get('/info',async (ctx,next) =>{
    let userId = ctx.request;
    let user = await users.get(userId);
    ctx.body = 'get user info success';
})

router.post('/info',async (ctx,next) => {
  let info = ctx.request.body || {};
  await users.add(info);
  ctx.body = 'add success';
})

router.patch('/info',async (ctx,next) => {
  let info = ctx.request.body || {};
  await users.update(info);
  ctx.body = 'update success';
});

router.delete('/info',async (ctx,next) => {
  let info = ctx.request.body || "";
  await users.remove(info);
  ctx.body = 'delete success';
})

module.exports = router
