import { AdminLang } from '../types';

export const es: Record<AdminLang, string> = {
    /* apps */
    'apps.admin': 'SMOP Administradores',
    'apps.users': 'SMOP Usuarios',
    /* commons */
    'commons.multilanguage': 'Multilenguaje',
    'commons.allowmultilanguage': '¿Permitir multilenguaje?',
    /* profiles */
    'profiles.root': 'Super usuario',
    'profiles.admin': 'Administrador',
    'profiles.manager': 'Gerente',
    'profiles.auxiliar': 'Auxiliar',
    'profiles.cashier': 'Cajero',
    'profiles.waiter': 'Camarero',
    /* order types */
    'ordertypes.pickup': 'Recoger',
    'ordertypes.curbside': 'En la acera',
    'ordertypes.delivery': 'Entrega',
    'ordertypes.dine-in': 'EN el sitio',
    /* apply charge */
    'applycharge.0': 'Después del descuento',
    'applycharge.1': 'Antes del descuento',
    /* day */
    'day.opening': 'Apertura',
    'day.closing': 'Cierre',
    'day.weekday': 'Día de la semana',
    'day.sunday': 'Domingo',
    'day.monday': 'Lunes',
    'day.tuesday': 'martes',
    'day.wenesday': 'Miércoles',
    'day.thursday': 'Jueves',
    'day.friday': 'viernes',
    'day.saturday': 'Sábado',
    /* time */
    'time.hours': 'Horas',
    'time.minutes': 'Minutos',
    /* longitude */
    'longitude.miles': 'Millas',
    /* actions */
    'actions.goback': 'Volver',
    'actions.tryagain': 'Intentar de nuevo',
    'actions.open': 'Abrir',
    'actions.close': 'Cerrar',
    'actions.cancel': 'Cancelar',
    'actions.new': 'Crear nuevo',
    'actions.save': 'Guardar',
    'actions.edit': 'Editar',
    'actions.update': 'Actualizar',
    'actions.clean': 'Limpiar',
    'actions.filter': 'Filtrar',
    'actions.suspend': 'Suspender',
    'actions.restore': 'Restaurar',
    'actions.detail': 'Detalles',
    'actions.link': 'Vincular',
    'actions.unlink': 'Desvincular',
    'actions.more': 'Acciones',
    'actions.prevstep': 'Paso anterior',
    'actions.nextstep': 'Siguiente paso',
    'actions.changelanguage': 'Cambiar idioma',
    'actions.logout': 'Cerrar sesión',
    'actions.pwrecovery': 'Restablecer contraseña',
    'actions.add': 'Agregar',
    'actions.remove': 'Eliminar',
    'actions.activate': 'Activar',
    'actions.deactivate': 'Desactivar',
    'actions.repeatweekday': 'Repetir primer día',
    'actions.merge': 'Fusionar',
    'actions.replace': 'Reemplazar',
    /* messages */
    'messages.activate': '¿Está seguro de que desea activarlo?',
    'messages.deactivate': '¿Está seguro de que desea desactivarlo?',
    'messages.nolinkedcommerce': 'Ningún comercio vinculado todavía...',
    'messages.remove': '¿Está seguro de que desea eliminarlo?',
    'messages.merge': '¿Está seguro de que desea fusionar?',
    'messages.replace': '¿Está seguro de que desea reemplazar?',
    /* filter */
    'filter.name': 'filtrar por nombre',
    'filter.status': 'filtrar por estado',
    'filter.fromdate': 'desde la fecha de creación',
    'filter.todate': 'hasta la fecha de creación',
    'filter.profile': 'filtrar por perfil',
    'filter.type': 'filtrar por tipo',
    /* headers */
    'headers.name': 'Nombre',
    'headers.created': 'Creado',
    'headers.status': 'Estado',
    'headers.actions': 'Acciones',
    'headers.amount': 'Cantidad',
    'headers.profile': 'Perfil',
    'headers.contacts': 'Contactos',
    'headers.price': 'Precio de venta',
    /* status */
    'status.active': 'Activo',
    'status.inactive': 'Inactivo',
    /* types */
    'types.addon': 'Marcar como complemento',
    /* nav links */
    'links.dashboard': 'Dashboard',
    'links.home': 'Inicio',
    'links.organizations': 'Organizaciones',
    'links.organization': 'Organización',
    'links.commerces': 'Comercios',
    'links.users': 'Usuarios',
    'links.shelf': 'Estante de productos',
    'links.titles': 'Títulos del menú',
    'links.addons': 'Complementos de menú',
    'links.products': 'Productos',
    'links.linked': 'Vinculado conmigo',
    'links.linkedcommerce': 'Comercio vinculado',
    /* views */
    /* auth views */
    'auth.name.placeholder': 'Nombre de usuario',
    'auth.name.hint': 'nombre de usuario',
    'auth.name.required': 'nombre de usuario es obligatorio',
    'auth.phone.placeholder': 'Número de teléfono del usuario',
    'auth.phone.hint': 'número de teléfono del usuario',
    'auth.phone.required': 'se requiere el número de teléfono del usuario',
    'auth.phone.format': 'formato: +000-00000000',
    'auth.email.placeholder': 'Correo electrónico del usuario',
    'auth.email.hint': 'correo electrónico del usuario',
    'auth.email.required': 'se requiere el correo electrónico del usuario',
    'auth.email.format': 'formato de correo electrónico no válido',
    'auth.password.placeholder': 'Contraseña de usuario',
    'auth.password.hint': 'mayúsculas, minúsculas y carácter especial @$!%*?&',
    'auth.password.required': 'se requiere contraseña de usuario',
    'auth.password.min': 'la contraseña debe contener al menos 8 caracteres',
    'auth.password.max': 'la contraseña debe contener hasta 15 caracteres',
    'auth.password.format': 'carácter especial @$!%*?&, mayúsculas y minúsculas',
    'auth.currentpassword.placeholder': 'Contraseña actual',
    'auth.currentpassword.required': 'se requiere contraseña actual',
    'auth.newpassword.placeholder': 'Nueva contraseña',
    'auth.newpassword.required': 'se requiere una nueva contraseña',
    'auth.repeatpassword.placeholder': 'Confirmar contraseña',
    'auth.repeatpassword.required': 'se requiere confirmación de contraseña',
    'auth.repeatpassword.equal': 'la nueva contraseña y la confirmación deben coincidir',
    'auth.profile.placeholder': 'Perfil de usuario',
    'auth.profile.hint': 'perfil de usuario',
    'auth.profile.required': 'se requiere perfil de usuario',
    'auth.commerce.placeholder': 'Comercio vinculado al usuario',
    'auth.commerce.hint': 'comercio vinculado al usuario',
    'auth.commerce.required': 'se requiere comercio para vincular',
    /* sign in view */
    'signin.title': 'Iniciar sesión',
    'signin.actions.signin': 'Iniciar sesión',
    'signin.actions.recovery': 'Restablecer contraseña',
    /* reset password view */
    'resetpassword.title': 'Restablecer contraseña',
    'resetpassword.actions.reset': 'Restablecer contraseña',
    /* organizations view */
    'organizations.title': 'Lista de organizaciones',
    /* create organization view */
    'createorg.title': 'Crear organización',
    'createorg.schema.placeholder': 'Nombre del esquema de la organización',
    'createorg.schema.hint': 'solo letras en minúsculas',
    'createorg.schema.required': 'se requiere el nombre del esquema de la organización',
    'createorg.schema.alphabets': 'solo letras en minúsculas',
    'createorg.name.placeholder': 'Nombre completo',
    'createorg.name.hint': 'administrador de la organización',
    'createorg.name.required': 'se requiere el nombre completo',
    'createorg.email.hint': 'haga clic en @ para generar correo electrónico',
    'createorg.email.generate': 'Haga clic aquí para generar correo electrónico',
    /* organization detail view */
    'orgdetail.title': 'Detalle de la organización',
    'orgdetail.references': 'Referencias',
    'orgdetail.orgname': 'Nombre de la organización',
    'orgdetail.owner': 'Propietario',
    'orgdetail.settings': 'Configuración',
    'orgdetail.decimals': 'Decimales',
    'orgdetail.languages': 'Idiomas aceptados',
    'orgdetail.branding': 'Marca',
    /* organization edit */
    'orgedit.references': 'Actualizar referencias',
    'orgedit.org.placeholder': 'Nombre de la organización',
    'orgedit.org.hint': 'nombre de referencia de la organización',
    'orgedit.org.required': 'nombre de la organización es obligatorio',
    'orgedit.owner.placeholder': 'Nombre del propietario',
    'orgedit.owner.hint': 'nombre de referencia del propietario',
    'orgedit.owner.required': 'se requiere el nombre del propietario',
    'orgedit.settings': 'Actualizar configuración',
    'orgedit.decimals.placeholder': 'Decimales para precios del 1 al 4',
    'orgedit.decimals.hint': 'cantidad de decimales para precios',
    'orgedit.decimals.integer': 'solo enteros',
    'orgedit.decimals.min': 'cantidad mínima: 1',
    'orgedit.decimals.max': 'cantidad máxima: 4',
    'orgedit.languages.description': 'característica en proceso de trabajo',
    'orgedit.languages.hint': 'Soporte multilenguaje',
    'orgedit.branding': 'Actualizar marca',
    'orgedit.cover.hint': 'portada de marca',
    'orgedit.cover.required': 'se requiere portada de marca',
    'orgedit.cover.size': 'tamaño de archivo de portada de hasta 10 MB',
    'orgedit.cover.type': 'tipo de archivo de portada permitido: jpg / png',
    'orgedit.profile.hint': 'perfil de marca',
    'orgedit.profile.required': 'se requiere perfil de marca',
    'orgedit.profile.size': 'tamaño de archivo de perfil de hasta 10 MB',
    'orgedit.profile.type': 'tipo de archivo de perfil permitido: jpg / png',
    /* commerce list view */
    'commercelist.title': 'Lista de comercio',
    'commercelist.updatestatus': 'Actualizar estado de comercio',
    /* commerce detail view */
    'commercedetail.title': 'Detalle de comercio',
    'commercedetail.references': 'Referencias',
    'commercedetail.name': 'Nombre del comercio',
    'commercedetail.address': 'Dirección',
    'commercedetail.optaddress': 'Dirección opcional',
    'commercedetail.zipcode': 'Código postal',
    'commercedetail.phones': 'Números de teléfono',
    'commercedetail.geoinfo': 'Información geográfica',
    'commercedetail.country': 'País',
    'commercedetail.state': 'Estado',
    'commercedetail.city': 'Ciudad',
    'commercedetail.timezone': 'Zona horaria',
    'commercedetail.gtmoffset': 'GTM Offset',
    'commercedetail.settings': 'Configuración de pedidos',
    'commercedetail.online': '¿Acepta pedidos en línea ahora mismo?',
    'commercedetail.orders': 'Tipos de pedidos permitidos',
    'commercedetail.charge': 'Cargo por Pedido en línea',
    'commercedetail.typecharge': 'Tipo de cargo',
    'commercedetail.percentagecharge': 'por porcentaje',
    'commercedetail.amountcharge': 'por monto',
    'commercedetail.applycharge': 'Aplicar cargo',
    'commercedetail.sms': '¿Alertas de pedido por SMS?',
    'commercedetail.deliveries': 'Configuración de delivery',
    'commercedetail.third': '¿Permitir delivery por terceros?',
    'commercedetail.thirdsite': 'Sitio web de delivery de terceros',
    'commercedetail.mindelivery': 'Cantidad mínima para delivery',
    'commercedetail.deliveryarea': 'Zona de delivery',
    'commercedetail.attention': 'Configuración de atención',
    'commercedetail.onsite': 'Atención en el sitio',
    'commercedetail.onsitepreparation': 'Tiempo de preparación en el sitio',
    'commercedetail.delivery': 'Atención por delivery',
    'commercedetail.deliverypreparation': 'Tiempo de preparación para delivery',
    /* commerce edit */
    'commerceedit.references': 'Actualizar referencias',
    'commerceedit.name.placeholder': 'Nombre del comercio',
    'commerceedit.name.hint': 'actualizar nombre comercial',
    'commerceedit.name.required': 'nombre comercial es obligatorio',
    'commerceedit.phones.placeholder': 'Número de teléfono de comercio',
    'commerceedit.phones.hint': 'actualizar el número de teléfono de comercio',
    'commerceedit.phones.required': 'se requiere el número de teléfono de comercio',
    'commerceedit.phones.format': 'formato: +000-00000000',
    'commerceedit.country.placeholder': 'Seleccione el país',
    'commerceedit.country.hint': 'actualizar el país',
    'commerceedit.country.required': 'se requiere el país',
    'commerceedit.state.placeholder': 'Seleccione el estado',
    'commerceedit.state.hint': 'actualizar el estado',
    'commerceedit.state.required': 'se requiere el estado',
    'commerceedit.city.placeholder': 'Seleccione la ciudad',
    'commerceedit.city.hint': 'actualizar la ciudad',
    'commerceedit.city.required': 'se requiere la ciudad',
    'commerceedit.address.placeholder': 'Dirección de comercio',
    'commerceedit.address.hint': 'actualizar dirección comercial',
    'commerceedit.address.required': 'se requiere la dirección del comercial',
    'commerceedit.optaddress.placeholder': 'Dirección opcional de comercio',
    'commerceedit.optaddress.hint': 'actualizar dirección opcional',
    'commerceedit.zipcode.placeholder': 'Código postal de la ubicación de comercio',
    'commerceedit.zipcode.hint': 'actualizar el código postal de la ubicación de comercio',
    'commerceedit.zipcode.required': 'se requiere el código postal de la ubicación',
    'commerceedit.timezone.placeholder': 'Zona horaria de la ubicación del comercio',
    'commerceedit.timezone.hint': 'actualizar la zona horaria de la ubicación de comercio',
    'commerceedit.timezone.required': 'se requiere la zona horaria de la ubicación',
    'commerceedit.gtmoffset.placeholder': 'GTM Offset',
    'commerceedit.gtmoffset.hint': 'actualizar GTM offset',
    'commerceedit.gtmoffset.required': 'se requiere GTM offset',
    'commerceedit.settings': 'Actualizar configuración de pedidos',
    'commerceedit.online.hint': '¿Acepta pedidos en línea ahora mismo?',
    'commerceedit.percentagecharge.title': '¿Cargo de pedido en línea por porcentaje?',
    'commerceedit.percentagecharge.placeholder': 'Cargo de pedido en línea porcentual',
    'commerceedit.percentagecharge.hint': 'actualizar el porcentaje de cargo de pedido en línea',
    'commerceedit.amountcharge.title': '¿Cargo de pedido en línea por cantidad?',
    'commerceedit.amountcharge.placeholder': 'Cargo de pedido en línea por cantidad',
    'commerceedit.amountcharge.hint': 'actualizar la cantidad de cargo de pedido en línea',
    'commerceedit.charge.min': 'el valor mínimo debe ser: 0',
    'commerceedit.applycharge.placeholder': 'Aplicar cargo al pedido',
    'commerceedit.applycharge.hint': 'actualizar aplicar cargo al pedido',
    'commerceedit.applycharge.required': 'se requiere aplicar el cargo al pedido',
    'commerceedit.sms.hint': '¿Permitir alertas de pedido por SMS?',
    'commerceedit.deliveries': 'Actualizar delivery',
    'commerceedit.third.hint': '¿Permitir entrega por terceros?',
    'commerceedit.thirdsite.placeholder': 'URL de entrega externa',
    'commerceedit.thirdsite.hint': 'actualizar URL de entrega externa',
    'commerceedit.mindelivery.placeholder': 'Cantidad mínima para delivery',
    'commerceedit.mindelivery.hint': 'actualizar cantidad mínima para delivery',
    'commerceedit.deliveryzone.hint': '¿Permitir zona de entrega?',
    'commerceedit.deliveryarea.placeholder': 'Área de entrega',
    'commerceedit.deliveryarea.hint': 'actualizar área de entrega en millas',
    'commerceedit.attention': 'Actualizar atención',
    'commerceedit.onsite': 'Actualizar horas de servicio en el sitio',
    'commerceedit.onsitepreparation': 'Actualizar el tiempo de preparación en el sitio',
    'commerceedit.delivery': 'Actualizar horas de servicio para delivery',
    'commerceedit.deliverypreparation': 'Actualizar tiempo de preparación para delivery',
    'commerceedit.opening.hint': 'actualizar apertura',
    'commerceedit.opening.format': 'formato: 23:59',
    'commerceedit.closing.hint': 'actualizar cierre',
    'commerceedit.closing.format': 'formato: 23:59',
    'commerceedit.hours.placeholder': 'Horas para preparar',
    'commerceedit.hours.hint': 'actualizar horas para preparar',
    'commerceedit.hours.min': 'cantidad mínima de horas: 0',
    'commerceedit.minutes.placeholder': 'Minutos para preparar',
    'commerceedit.minutes.hint': 'actualizar minutos para preparar',
    'commerceedit.minutes.min': 'cantidad mínima de minutos: 0',
    'commerceedit.minutes.max': 'cantidad máxima de minutos: 59',
    /* create commerce view */
    'createcommerce.title': 'Crear comercio',
    'createcommerce.references': 'Referencias',
    'createcommerce.name.placeholder': 'Nombre del comercio',
    'createcommerce.name.hint': 'nombre comercial',
    'createcommerce.name.required': 'nombre comercial es obligatorio',
    'createcommerce.phones.placeholder': 'Número de teléfono de comercio',
    'createcommerce.phones.hint': 'número de teléfono de comercio',
    'createcommerce.phones.required': 'se requiere el número de teléfono de comercio',
    'createcommerce.phones.format': 'formato: +000-00000000',
    'createcommerce.country.placeholder': 'Seleccione el país de comercio',
    'createcommerce.country.hint': 'país de comercio',
    'createcommerce.country.required': 'se requiere el país de comercio',
    'createcommerce.state.placeholder': 'Seleccione el estado de comercio',
    'createcommerce.state.hint': 'estado de comercio',
    'createcommerce.state.required': 'se requiere el estado',
    'createcommerce.city.placeholder': 'Seleccione la ciudad de comercio',
    'createcommerce.city.hint': 'ciudad de comercio',
    'createcommerce.city.required': 'se requiere la ciudad',
    'createcommerce.address.placeholder': 'Dirección de comercio',
    'createcommerce.address.hint': 'dirección de comercio',
    'createcommerce.address.required': 'se requiere dirección de comercio',
    'createcommerce.optaddress.placeholder': 'Dirección opcional de comercio',
    'createcommerce.optaddress.hint': 'dirección opcional de comercio',
    'createcommerce.zipcode.placeholder': 'Código postal de la ubicación de comercio',
    'createcommerce.zipcode.hint': 'código postal de ubicación de comercio',
    'createcommerce.zipcode.required': 'se requiere el código postal de la ubicación',
    'createcommerce.timezone.placeholder': 'Zona horaria de la ubicación de comercio',
    'createcommerce.timezone.hint': 'zona horaria de la ubicación de comercio',
    'createcommerce.timezone.required': 'se requiere la zona horaria de la ubicación',
    'createcommerce.gtmoffset.placeholder': 'GTM Offset',
    'createcommerce.gtmoffset.hint': 'GTM offset',
    'createcommerce.gtmoffset.required': 'se requiere GTM offset',
    'createcommerce.settings': 'Configuración de pedidos',
    'createcommerce.online.hint': '¿Acepta pedidos en línea ahora mismo?',
    'createcommerce.percentagecharge.title': '¿Cargo de pedido en línea por porcentaje?',
    'createcommerce.percentagecharge.placeholder': 'Porcentaje de cargo de pedido en línea',
    'createcommerce.percentagecharge.hint': 'porcentaje de cargo de pedido en línea',
    'createcommerce.amountcharge.title': '¿Cargo de pedido en línea por cantidad?',
    'createcommerce.amountcharge.placeholder': 'monto de cargo de pedido en línea',
    'createcommerce.amountcharge.hint': 'monto de cargo de pedido en línea',
    'createcommerce.charge.min': 'el valor mínimo debe ser: 0',
    'createcommerce.applycharge.placeholder': 'Aplicar cargo al pedido',
    'createcommerce.applycharge.hint': 'aplicar cargo al pedido',
    'createcommerce.applycharge.required': 'se requiere aplicar el cargo al pedido',
    'createcommerce.sms.hint': '¿Permitir alertas de pedido por SMS?',
    'createcommerce.deliveries': 'Configuración de delivery',
    'createcommerce.third.hint': '¿Permitir delivery de terceros?',
    'createcommerce.thirdsite.placeholder': 'URL de delivery externo',
    'createcommerce.thirdsite.hint': 'url de delivery externo',
    'createcommerce.mindelivery.placeholder': 'Cantidad mínima para delivery',
    'createcommerce.mindelivery.hint': 'cantidad mínima para delivery',
    'createcommerce.deliveryzone.hint': '¿Permitir zona para delivery?',
    'createcommerce.deliveryarea.placeholder': 'Área de delivery',
    'createcommerce.deliveryarea.hint': 'área de delivery en millas',
    'createcommerce.attention': 'Configuración de atención',
    'createcommerce.onsite': 'Horario de servicio en el sitio',
    'createcommerce.onsitepreparation': 'Tiempo de preparación en el sitio',
    'createcommerce.delivery': 'Horario de servicio para delivery',
    'createcommerce.deliverypreparation': 'Tiempo de preparación para delivery',
    'createcommerce.opening.hint': 'apertura',
    'createcommerce.opening.format': 'formato: 23:59',
    'createcommerce.closing.hint': 'cierre',
    'createcommerce.closing.format': 'formato: 23:59',
    'createcommerce.hours.placeholder': 'Horas para preparar',
    'createcommerce.hours.hint': 'horas para preparar',
    'createcommerce.hours.min': 'cantidad mínima de horas: 0',
    'createcommerce.minutes.placeholder': 'Minutos para preparar',
    'createcommerce.minutes.hint': 'minutos para preparar',
    'createcommerce.minutes.min': 'cantidad mínima de minutos: 0',
    'createcommerce.minutes.max': 'cantidad máxima de minutos: 59',
    /* user list view */
    'userlist.title': 'Lista de usuarios',
    'userlist.updatestatus': 'Actualizar estado de usuario',
    /* user link */
    'userlink.title': 'Vincular usuario a comercio',
    'userlink.name': 'Nombre completo',
    'userlink.email': 'Correo electrónico del usuario',
    'userlink.phone': 'Número de teléfono del usuario',
    'userlink.created': 'Fecha de creación',
    'userlink.unlink': 'Desvincular usuario del comercio',
    /* create user */
    'createuser.title': 'Crear usuario vinculado',
    'createuser.linked.hint': '¿Está vinculado a un comercio?',
    /* main title list view */
    'maintitlelist.title': 'Lista de títulos del menú',
    'maintitlelist.updatestatus': 'Actualizar el estado del título de menú',
    /* main title detail */
    'maintitledetail.title': 'Detalle del título de menú',
    'maintitledetail.collection': 'Nombre del título de menú',
    'maintitledetail.created': 'Fecha de creación',
    'maintitledetail.products': 'Lista de productos del título de menú',
    /* main title edit */
    'maintitleedit.title': 'Editar título de menú',
    'maintitleedit.collection.placeholder': 'Nombre del título de menú',
    'maintitleedit.collection.hint': 'actualizar el nombre del título de menú',
    'maintitleedit.collection.required': 'se requiere el nombre del título de menú',
    'maintitleedit.image.hint': 'actualizar la imagen del título de menú',
    'maintitleedit.image.description':
        'Imagen actual: si no selecciona una nueva imagen de título de menú, se conservará la imagen actual',
    'maintitleedit.image.size': 'tamaño de archivo de imagen de hasta 10 MB',
    'maintitleedit.image.type': 'tipo de archivo de imagen permitido: jpg / png',
    /* create main title */
    'createmaintitle.title': 'Crear título de menú',
    'createmaintitle.collection.placeholder': 'Nombre del título de menú',
    'createmaintitle.collection.hint': 'nombre del título de menú',
    'createmaintitle.collection.required': 'se requiere el nombre del título de menú',
    'createmaintitle.image.hint': 'imagen del título de menú como archivo jpg/png',
    'createmaintitle.image.required': 'se requiere la imagen del título de menú',
    'createmaintitle.image.size': 'tamaño de archivo de imagen de hasta 10 MB',
    'createmaintitle.image.type': 'tipo de archivo de imagen permitido: jpg / png',
    /* addon title list */
    'addontitlelist.title': 'Lista de título de complemento',
    'addontitlelist.updatestatus': 'Actualizar el estado del título de complemento',
    /* addon title detail */
    'addontitledetail.title': 'Detalle del título de complemento',
    'addontitledetail.collection': 'Nombre del título de complemento',
    'addontitledetail.created': 'Fecha de creación',
    'addontitledetail.products': 'Lista de productos del título de complemento',
    /* addon title edit */
    'addontitleedit.title': 'Editar título de complemento',
    'addontitleedit.collection.placeholder': 'Nombre del título de complemento',
    'addontitleedit.collection.hint': 'actualizar el nombre del título de complemento',
    'addontitleedit.collection.required': 'se requiere el nombre del título de complemento',
    /* create addon title */
    'createaddontitle.title': 'Crear título de complemento',
    'createaddontitle.collection.placeholder': 'Nombre del título de complemento',
    'createaddontitle.collection.hint': 'nombre del título de complemento',
    'createaddontitle.collection.required': 'se requiere el nombre del título de complemento',
    /* product list view */
    'productlist.title': 'Lista de productos',
    'productlist.updatestatus': 'Actualizar estado del producto',
    /* product detail view */
    'productdetail.title': 'Detalle del producto',
    'productdetail.general': 'Configuración general',
    'productdetail.references': 'Nombre de referencia del producto',
    'productdetail.description': 'Descripción del producto',
    'productdetail.presentation': 'Presentación del producto',
    'productdetail.nopresentation': 'Sin presentación de producto',
    'productdetail.allowprompts': '¿Permitir notas?',
    'productdetail.picture': 'Configuración de imagen',
    'productdetail.nopicture': 'No hay imagen todavía',
    'productdetail.collection': 'Configuración de la colección',
    'productdetail.main': 'Forma parte de las colecciones principales',
    'productdetail.nomain': 'No está contenido en ninguna colección principal',
    'productdetail.addon': 'Es parte de las colecciones de complementos',
    'productdetail.noaddon': 'No está contenido en ninguna colección de complementos',
    'productdetail.accessory': 'Configuración de accesorios',
    'productdetail.multiple': 'Contiene múltiples opciones',
    'productdetail.nomultiple': 'No contiene opciones múltiples',
    'productdetail.single': 'Contiene opciones individuales',
    'productdetail.nosingle': 'No contiene opciones individuales',
    /* product edit */
    'productedit.general': 'Actualizar configuración general',
    'productedit.references.title': 'Actualizar nombre del producto',
    'productedit.references.placeholder': 'Nombre del producto',
    'productedit.references.hint': 'actualizar nombre del producto',
    'productedit.references.required': 'nombre del producto es obligatorio',
    'productedit.description.title': 'Actualizar descripción del producto',
    'productedit.description.placeholder': 'Descripción del producto',
    'productedit.description.hint': 'actualizar descripción del producto',
    'productedit.description.required': 'se requiere la descripción del producto',
    'productedit.price.placeholder': 'Precio de venta del producto',
    'productedit.price.hint': 'actualizar precio de venta del producto',
    'productedit.price.required': 'precio de venta del producto es requerido',
    'productedit.allowprompts.hint': '¿Permitir notas?',
    'productedit.picture': 'Actualizar configuración de imagen',
    'productedit.image.hint': 'actualizar la imagen del producto',
    'productedit.image.required': 'se requiere la imagen del producto',
    'productedit.image.size': 'tamaño de archivo de imagen de hasta 10 MB',
    'productedit.image.type': 'tipo de archivo de imagen permitido: jpg / png',
    'productedit.collection': 'Actualizar la configuración de la colección',
    'productedit.main.title': 'Actualizar colección principal',
    'productedit.main.placeholder': 'Colección principal',
    'productedit.main.hint': 'elegir colección principal',
    'productedit.markasaddon.hint': '¿Marcar producto como complemento?',
    'productedit.addon.title': 'Actualizar colección de complementos',
    'productedit.addon.placeholder': 'Colección de complementos',
    'productedit.addon.hint': 'elegir colección de complementos',
    'productedit.addon.required': 'se requiere al menos una colección de complementos',
    'productedit.accessory': 'Actualizar configuración de accesorios',
    'productedit.multiple.title': 'Actualizar colección de opciones múltiples',
    'productedit.multiple.placeholder': 'Colección de opciones múltiples',
    'productedit.multiple.hint': 'elegir colección de opciones múltiples',
    'productedit.single.title': 'Actualizar colección de opción individual',
    'productedit.single.placeholder': 'Colección de opción individual',
    'productedit.single.hint': 'elegir colección de opción individual',
    'createproduct.title': 'Crear producto',
    'createproduct.general': 'Configuración general',
    'createproduct.references.title': 'Nombre de referencia del producto',
    'createproduct.references.placeholder': 'Nombre de referencia',
    'createproduct.references.hint': 'nombre de referencia',
    'createproduct.references.required': 'nombre de la referencia es obligatorio',
    'createproduct.description.title': 'Descripción de la referencia del producto',
    'createproduct.description.placeholder': 'Descripción de la referencia',
    'createproduct.description.hint': 'descripción de referencia',
    'createproduct.description.required': 'se requiere descripción de referencia',
    'createproduct.price.placeholder': 'Precio de venta del producto',
    'createproduct.price.hint': 'precio de venta del producto',
    'createproduct.price.required': 'precio de venta del producto es requerido',
    'createproduct.allowprompts.hint': '¿Permitir notas?',
    'createproduct.picture': 'Imagen del producto',
    'createproduct.image.title': '¿Quieres incluir una imagen del producto?',
    'createproduct.image.hint': 'imagen del producto como archivo jpg/png',
    'createproduct.image.required': 'se requiere la imagen del producto',
    'createproduct.image.size': 'tamaño de archivo de imagen de hasta 10 MB',
    'createproduct.image.type': 'tipo de archivo de imagen permitido: jpg / png',
    'createproduct.collection': 'Configuración de la colección',
    'createproduct.main.title': 'Forma parte de las colecciones principales',
    'createproduct.main.placeholder': 'Elegir colección principal',
    'createproduct.main.hint': 'colección principal del producto',
    'createproduct.addon.title': '¿Marcar como complemento?',
    'createproduct.addon.placeholder': 'Elegir colección de complementos',
    'createproduct.addon.hint': 'colección de complementos de productos',
    'createproduct.addon.required': 'se requiere al menos una colección de complementos',
    'createproduct.accessory': 'Accesorios del producto',
    'createproduct.multiple.title': 'Contiene múltiples opciones',
    'createproduct.multiple.placeholder': 'Elegir opción múltiple',
    'createproduct.multiple.hint': 'opción múltiple del producto',
    'createproduct.single.title': 'Contiene opciones individuales',
    'createproduct.single.placeholder': 'Elegir opción individual',
    'createproduct.single.hint': 'opción individual del producto',
    /* linked commerce management view */
    'linkedcommerce.title': 'Gestión de comercio vinculado',
    'commercemenu.title': 'Menú de comercio',
    'commercemenu.removemenu': 'Eliminar menú',
    /* linked commerce menu detail view */
    'menudetail.title': 'Detalle de menú vinculado',
    /* link title menu view */
    'linkmenu.title': 'Vincular el título de menú al comercio',
    'linkmenu.title.placeholder': 'Menú para vincular',
    'linkmenu.title.hint': 'elegir menú para vincular',
    'linkmenu.title.required': 'menú para vincular es requerido',
    'linkmenu.price.placeholder': 'Precio del producto',
    'linkmenu.price.hint': 'precio del producto seleccionado',
    'linkmenu.price.required': 'precio del producto es obligatorio',
    'linkmenu.price.min': 'seleccione al menos un producto',
    /* linked title menu edit view */
    'menuedit.title': 'Editar título de menú vinculado',
    'menuedit.price.placeholder': 'Precio del producto',
    'menuedit.price.hint': 'precio del producto seleccionado',
    'menuedit.price.required': 'precio del producto es obligatorio',
    'menuedit.price.min': 'seleccione al menos un producto',
    /* menu migrater */
    'migrater.current': 'Menú actual',
    'migrater.nocurrent': 'Aún no hay menú',
    'migrater.migrater': 'Migrar menú',
    'migrater.generic': 'Menú genérico',
    'migrater.commerce': 'Menú de comercio',
    'migrater.merge': 'Fusionar menú',
    'migrater.replace': 'Reemplazar menú',
    'migrater.commerce.title': 'Comercio para migrar menú',
    'migrater.commerce.placeholder': 'Seleccione el comercio',
    'migrater.commerce.hint': 'seleccione un comercio para migrar menú',
    'migrater.commerce.nocommerces': 'Todavía no hay comercios con menú',
    'migrater.commerce.noselected': 'Por favor seleccione un comercio para migrar menú',
    'migrater.commerce.nomenu': 'El comercio seleccionado no tiene menú',
};
