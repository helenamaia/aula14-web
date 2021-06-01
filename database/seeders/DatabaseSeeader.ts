import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class DatabaseSeeaderSeeder extends BaseSeeder {
  public async run () {
    const user1 = await User.create({name: 'albino', email: 'albino@albino.com', password: '123'})
    const user2 = await User.create({name: 'nego', email: 'nego@nego.com', password: '123'})
    await user1.related('setting').create({theme: 'dark'})
    await user2.related('setting').create({theme: 'light'})
 
 
    const list1 = await user1.related('lists').create({name: 'Mercado'})
    await list1.related('tasks').createMany([
      {title: 'Pão', description: 'Integral'},
      {title: 'Leite', done: true},
      {title: 'Manteiga', description: 'Sem sal', done: true},
    ])

    const list2 = await user1.related('lists').create({name: 'Compras'})
    await list2.related('tasks').create({title: 'Camiseta'})

    const list3 = await user2.related('lists').create({name: 'Exercicios'})
    await list3.related('tasks').createMany([
      {title: 'Supino', description: '3 repetições'},
      {title: 'flexão',description: '5 repetições', done: true},
    ])

    await list1.related('sharedWithUsers').save(user2)
    await list3.related('sharedWithUsers').save(user1)
  } 
}
