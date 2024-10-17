import Order from '#models/order'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class OrdersController {
  /**
   * Display a list of resource
   */
  async index({ params }: HttpContext) {
    return await db.from('orders').where('user_id', params?.id)
  }

  /**
   * Display form to create a new record
   */
  async create({}: HttpContext) {}

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const formData = request.body()

    const order = await Order.create({
      userId: formData.userId,
      orderDate: formData.orderDate,
      product: formData.product,
    })

    return order
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    return await db.from('orders').where('id', params.id).first()
  }

  /**
   * Edit individual record
   */
  async edit({ params, request }: HttpContext) {
    const formData = request.body()
    const order = await Order.findOrFail(params?.id)
    order.orderDate = formData.orderDate
    order.product = formData.product
    await order.save()
    return order
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {}

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const order = await Order.findOrFail(params.id)
    await order.delete()
  }
}
