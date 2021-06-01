 import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import SettingValidator from 'App/Validators/SettingValidator'

export default class SettingsController {
  public async index({ view, auth }: HttpContextContract) {
    const themes = ['dark', 'light']
    const settings = await auth.user!!.related('setting').query().first()
    return view.render('settings/index', {themes, settings})
  }

  public async store({ request, response, auth }: HttpContextContract) {
    const data = request.only(['theme'])
    await request.validate(SettingValidator)
    const setting = await auth.user!!.related('setting').query().first()
    if (setting) {
      setting.merge(data)
      await setting.save()
    } else {
      await auth.user!!.related('setting').create(data)
    }
    return response.redirect().toRoute('root')
  }
}
