import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class Setting extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public theme: string

  @column()
  public userId: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  // setting belongs to user

  @belongsTo(() => User)
  public user: BelongsTo<typeof User> 
}
