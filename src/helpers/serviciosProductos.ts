import { Producto } from './../models/TProductos.model'
import { Usuario } from './../models/TUsuarios.model'
import { registrarProducto } from './../types'
import * as BD from './bdActions'

export async function añadirProducto (producto: registrarProducto): Promise<void> {
  const registeredProduct = new Producto({
    ...producto
  })
  await BD.connectBD()
  const registeredProductId = await registeredProduct.save()
  await Usuario.findOneAndUpdate({ _id: registeredProduct.usuario }, { $push: { productos: registeredProductId._id } })
  await BD.disconnectBD()
}
