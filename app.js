/* =========================================================
   ScanFresh — app.js
   Buscador de productos (por nombre/variedad) + Catálogo de fotos
   ========================================================= */

(() => {
  'use strict';

  /* ---------------------------------------------------------
     1. BASE DE DATOS LOCAL DE INVENTARIO (datos reales)
     Cada producto trae su código PLU real de referencia.
  --------------------------------------------------------- */
  const inventario = [
  { id: 1, plu: 3495, nombre: 'Aguacate', variedad: 'Beneke', categoria: 'FRUTA FRESCA' },
  { id: 2, plu: 4227, nombre: 'Aguacate', variedad: 'Criollo', categoria: 'FRUTA FRESCA' },
  { id: 3, plu: 4225, nombre: 'Aguacate', variedad: 'Hass', categoria: 'FRUTA FRESCA' },
  { id: 4, plu: 7013, nombre: 'Apio', variedad: 'Importado', categoria: 'VERDURA FRESCA' },
  { id: 5, plu: 6086, nombre: 'Ayote', variedad: 'Butternut', categoria: 'VERDURA FRESCA' },
  { id: 6, plu: 4789, nombre: 'Ayote', variedad: 'Sazón', categoria: 'VERDURA FRESCA' },
  { id: 7, plu: 9543, nombre: 'Ayote', variedad: 'Tierno', categoria: 'VERDURA FRESCA' },
  { id: 8, plu: 7646, nombre: 'Bananito', variedad: 'Dátil', categoria: 'FRUTA FRESCA' },
  { id: 9, plu: 4186, nombre: 'Banano', variedad: 'Convencional', categoria: 'FRUTA FRESCA' },
  { id: 10, plu: 7426, nombre: 'Berenjena', variedad: 'Convencional', categoria: 'VERDURA FRESCA' },
  { id: 11, plu: 7341, nombre: 'Brócoli', variedad: 'Convencional', categoria: 'VERDURA FRESCA' },
  { id: 12, plu: 4261, nombre: 'Coco', variedad: 'Pelado', categoria: 'FRUTA FRESCA' },
  { id: 13, plu: 4663, nombre: 'Cebolla', variedad: 'Blanca', categoria: 'VERDURA FRESCA' },
  { id: 14, plu: 9550, nombre: 'Cebolla', variedad: 'Morada', categoria: 'VERDURA FRESCA' },
  { id: 15, plu: 4715, nombre: 'Chile', variedad: 'Colores', categoria: 'VERDURA FRESCA' },
  { id: 16, plu: 7358, nombre: 'Chile', variedad: 'Jalapeño', categoria: 'VERDURA FRESCA' },
  { id: 17, plu: 7485, nombre: 'Chile', variedad: 'Verde', categoria: 'VERDURA FRESCA' },
  { id: 18, plu: 7348, nombre: 'Coliflor', variedad: 'Convencional', categoria: 'VERDURA FRESCA' },
  { id: 19, plu: 7422, nombre: 'Camote', variedad: 'Rojo', categoria: 'VERDURA FRESCA' },
  { id: 20, plu: 7351, nombre: 'Elote', variedad: 'Tierno', categoria: 'VERDURA FRESCA' },
  { id: 21, plu: 7303, nombre: 'Escarola', variedad: 'Amarilla', categoria: 'VERDURA FRESCA' },
  { id: 22, plu: 7648, nombre: 'Escarola', variedad: 'Morada', categoria: 'VERDURA FRESCA' },
  { id: 23, plu: 7641, nombre: 'Güisquil', variedad: 'Criollo', categoria: 'VERDURA FRESCA' },
  { id: 24, plu: 6087, nombre: 'Granada', variedad: 'P. Fresco', categoria: 'FRUTA FRESCA' },
  { id: 25, plu: 3127, nombre: 'Granada', variedad: 'Roja importada', categoria: 'FRUTA FRESCA' },
  { id: 26, plu: 7450, nombre: 'Guineo', variedad: 'De seda', categoria: 'FRUTA FRESCA' },
  { id: 27, plu: 8575, nombre: 'Ciruela', variedad: 'Convencional', categoria: 'FRUTA FRESCA' },
  { id: 28, plu: 7349, nombre: 'Guayaba', variedad: 'Convencional', categoria: 'FRUTA FRESCA' },
  { id: 29, plu: 4612, nombre: 'Jengibre', variedad: 'Convencional', categoria: 'VERDURA FRESCA' },
  { id: 30, plu: 3001, nombre: 'Jocote', variedad: 'Corriente', categoria: 'FRUTA FRESCA' },
  { id: 31, plu: 7154, nombre: 'Güisquil', variedad: 'Negro', categoria: 'VERDURA FRESCA' },
  { id: 32, plu: 7431, nombre: 'Jocote', variedad: 'Corona', categoria: 'FRUTA FRESCA' },
  { id: 33, plu: 4030, nombre: 'Kiwi', variedad: 'Importado', categoria: 'FRUTA FRESCA' },
  { id: 34, plu: 7388, nombre: 'Kiwi', variedad: 'Golden', categoria: 'FRUTA FRESCA' },
  { id: 35, plu: 7347, nombre: 'Limón', variedad: 'Pérsico', categoria: 'FRUTA FRESCA' },
  { id: 36, plu: 4106, nombre: 'Lechuga', variedad: 'Arrepollada', categoria: 'VERDURA FRESCA' },
  { id: 37, plu: 7566, nombre: 'Lechuga', variedad: 'Romana', categoria: 'VERDURA FRESCA' },
  { id: 38, plu: 3383, nombre: 'Mandarina', variedad: 'Clementina', categoria: 'FRUTA FRESCA' },
  { id: 39, plu: 4055, nombre: 'Mandarina', variedad: 'Criolla', categoria: 'FRUTA FRESCA' },
  { id: 40, plu: 8231, nombre: 'Mango', variedad: 'Importado', categoria: 'FRUTA FRESCA' },
  { id: 41, plu: 4168, nombre: 'Manzana', variedad: 'Amarilla', categoria: 'FRUTA FRESCA' },
  { id: 42, plu: 4131, nombre: 'Manzana', variedad: 'Fuji', categoria: 'FRUTA FRESCA' },
  { id: 43, plu: 4133, nombre: 'Manzana', variedad: 'Gala escolar', categoria: 'FRUTA FRESCA' },
  { id: 44, plu: 3009, nombre: 'Manzana', variedad: 'Gala importada', categoria: 'FRUTA FRESCA' },
  { id: 45, plu: 7522, nombre: 'Manzana', variedad: 'Gala grande', categoria: 'FRUTA FRESCA' },
  { id: 46, plu: 3072, nombre: 'Manzana', variedad: 'Pink Lady', categoria: 'FRUTA FRESCA' },
  { id: 47, plu: 4015, nombre: 'Manzana', variedad: 'Roja escolar', categoria: 'FRUTA FRESCA' },
  { id: 48, plu: 4016, nombre: 'Manzana', variedad: 'Roja mediana', categoria: 'FRUTA FRESCA' },
  { id: 49, plu: 7501, nombre: 'Manzana', variedad: 'Roja grande', categoria: 'FRUTA FRESCA' },
  { id: 50, plu: 7070, nombre: 'Manzana', variedad: 'Verde escolar', categoria: 'FRUTA FRESCA' },
  { id: 51, plu: 4017, nombre: 'Manzana', variedad: 'Verde mediana', categoria: 'FRUTA FRESCA' },
  { id: 52, plu: 3312, nombre: 'Maracuyá', variedad: 'Convencional', categoria: 'FRUTA FRESCA' },
  { id: 53, plu: 4038, nombre: 'Melocotón', variedad: 'Importado', categoria: 'FRUTA FRESCA' },
  { id: 54, plu: 4405, nombre: 'Melocotón', variedad: 'Nacional', categoria: 'FRUTA FRESCA' },
  { id: 55, plu: 4050, nombre: 'Melón', variedad: 'Cantalupe', categoria: 'FRUTA FRESCA' },
  { id: 56, plu: 7549, nombre: 'Mango', variedad: 'Pandés', categoria: 'FRUTA FRESCA' },
  { id: 57, plu: 4315, nombre: 'Mango', variedad: 'Tommy', categoria: 'FRUTA FRESCA' },
  { id: 58, plu: 4392, nombre: 'Naranja', variedad: 'Sin semilla', categoria: 'FRUTA FRESCA' },
  { id: 59, plu: 7639, nombre: 'Naranja', variedad: 'Washington', categoria: 'FRUTA FRESCA' },
  { id: 60, plu: 4036, nombre: 'Nectarina', variedad: 'Convencional', categoria: 'FRUTA FRESCA' },
  { id: 61, plu: 7270, nombre: 'Miltomate', variedad: 'Convencional', categoria: 'VERDURA FRESCA' },
  { id: 62, plu: 4072, nombre: 'Papa', variedad: 'Americana', categoria: 'VERDURA FRESCA' },
  { id: 63, plu: 35910, nombre: 'Papa', variedad: 'Roja importada', categoria: 'VERDURA FRESCA' },
  { id: 64, plu: 4728, nombre: 'Papa', variedad: 'Soloma', categoria: 'VERDURA FRESCA' },
  { id: 65, plu: 4983, nombre: 'Papa', variedad: 'Super', categoria: 'VERDURA FRESCA' },
  { id: 66, plu: 4462, nombre: 'Papaya', variedad: 'Taiwung', categoria: 'FRUTA FRESCA' },
  { id: 67, plu: 4596, nombre: 'Pepinillo', variedad: 'Convencional', categoria: 'VERDURA FRESCA' },
  { id: 68, plu: 7430, nombre: 'Pepino', variedad: 'Convencional', categoria: 'VERDURA FRESCA' },
  { id: 69, plu: 7354, nombre: 'Plátano', variedad: 'Convencional', categoria: 'FRUTA FRESCA' },
  { id: 70, plu: 7466, nombre: 'Paterna', variedad: 'Convencional', categoria: 'FRUTA FRESCA' },
  { id: 71, plu: 7355, nombre: 'Pera', variedad: 'Asiática', categoria: 'FRUTA FRESCA' },
  { id: 72, plu: 4412, nombre: 'Pera', variedad: 'Bosc', categoria: 'FRUTA FRESCA' },
  { id: 73, plu: 7353, nombre: 'Pera', variedad: 'Forelle', categoria: 'FRUTA FRESCA' },
  { id: 74, plu: 7083, nombre: 'Pera', variedad: 'Verde', categoria: 'FRUTA FRESCA' },
  { id: 75, plu: 7369, nombre: 'Pera', variedad: 'Roja', categoria: 'FRUTA FRESCA' },
  { id: 76, plu: 9571, nombre: 'Piña', variedad: 'Sin corona', categoria: 'FRUTA FRESCA' },
  { id: 77, plu: 5800, nombre: 'Pitahaya', variedad: 'Convencional', categoria: 'FRUTA FRESCA' },
  { id: 78, plu: 7847, nombre: 'Repollo', variedad: 'Blanco', categoria: 'VERDURA FRESCA' },
  { id: 79, plu: 4554, nombre: 'Repollo', variedad: 'Morado', categoria: 'VERDURA FRESCA' },
  { id: 80, plu: 4031, nombre: 'Sandía', variedad: 'Redonda', categoria: 'FRUTA FRESCA' },
  { id: 81, plu: 4344, nombre: 'Sandía', variedad: 'Larga', categoria: 'FRUTA FRESCA' },
  { id: 82, plu: 8234, nombre: 'Sandía', variedad: 'Amarilla', categoria: 'FRUTA FRESCA' },
  { id: 83, plu: 7297, nombre: 'Sandía', variedad: 'Negra', categoria: 'FRUTA FRESCA' },
  { id: 84, plu: 4664, nombre: 'Tomate', variedad: 'De cocina', categoria: 'VERDURA FRESCA' },
  { id: 85, plu: 7480, nombre: 'Tomate', variedad: 'De ensalada', categoria: 'VERDURA FRESCA' },
  { id: 86, plu: 7596, nombre: 'Toronja', variedad: 'Importada', categoria: 'FRUTA FRESCA' },
  { id: 87, plu: 7364, nombre: 'Uva', variedad: 'Negra', categoria: 'FRUTA FRESCA' },
  { id: 88, plu: 5144, nombre: 'Uva', variedad: 'Red Globe', categoria: 'FRUTA FRESCA' },
  { id: 89, plu: 4635, nombre: 'Uva', variedad: 'Roja importada', categoria: 'FRUTA FRESCA' },
  { id: 90, plu: 7359, nombre: 'Uva', variedad: 'Verde importada', categoria: 'FRUTA FRESCA' },
  { id: 91, plu: 7439, nombre: 'Yuca', variedad: 'Valencia', categoria: 'VERDURA FRESCA' },
  { id: 92, plu: 9552, nombre: 'Zucchini', variedad: 'Convencional', categoria: 'VERDURA FRESCA' },
  { id: 93, plu: 7419, nombre: 'Zanahoria', variedad: 'Convencional', categoria: 'VERDURA FRESCA' },
  { id: 94, plu: 4480, nombre: 'Zapote', variedad: 'Convencional', categoria: 'FRUTA FRESCA' },
  { id: 95, plu: 741006210501, nombre: 'Ajo', variedad: '500 gramos (bolsa)', categoria: 'VERDURA FRESCA' },
  { id: 96, plu: 741006210445, nombre: 'Ajo', variedad: 'Trenza (bolsa)', categoria: 'VERDURA FRESCA' },
  { id: 97, plu: 741006210422, nombre: 'Alcapate', variedad: 'Bolsa', categoria: 'VERDURA FRESCA' },
  { id: 98, plu: 741006210509, nombre: 'Berro', variedad: 'Manojo', categoria: 'VERDURA FRESCA' },
  { id: 99, plu: 3338322029, nombre: 'Blueberry', variedad: 'Bandeja', categoria: 'FRUTA FRESCA' },
  { id: 100, plu: 741390350010, nombre: 'Cebolla blanca', variedad: 'Red', categoria: 'VERDURA FRESCA' },
  { id: 101, plu: 740110360013, nombre: 'Cebollín', variedad: 'Manojo', categoria: 'VERDURA FRESCA' },
  { id: 102, plu: 741006210424, nombre: 'Cebollitas', variedad: 'Manojo', categoria: 'VERDURA FRESCA' },
  { id: 103, plu: 741006210508, nombre: 'Acelga', variedad: 'Manojo', categoria: 'VERDURA FRESCA' },
  { id: 104, plu: 741006210473, nombre: 'Chile verde', variedad: 'Bolsa 5 und', categoria: 'VERDURA FRESCA' },
  { id: 105, plu: 740110360035, nombre: 'Cilantro', variedad: 'Manojo', categoria: 'VERDURA FRESCA' },
  { id: 106, plu: 741006210450, nombre: 'Espárragos', variedad: 'Bandeja', categoria: 'VERDURA FRESCA' },
  { id: 107, plu: 741006210337, nombre: 'Espinaca china', variedad: 'Manojo', categoria: 'VERDURA FRESCA' },
  { id: 108, plu: 740110360023, nombre: 'Espinaca', variedad: 'Manojo', categoria: 'VERDURA FRESCA' },
  { id: 109, plu: 741006210025, nombre: 'Fresa', variedad: 'Bandeja', categoria: 'FRUTA FRESCA' },
  { id: 110, plu: 741001007910, nombre: 'Granadilla', variedad: 'Bandeja', categoria: 'FRUTA FRESCA' },
  { id: 111, plu: 740110360007, nombre: 'Limón', variedad: 'Bolsa 10 und', categoria: 'FRUTA FRESCA' },
  { id: 112, plu: 741006210234, nombre: 'Loroco', variedad: '4 oz', categoria: 'VERDURA FRESCA' },
  { id: 113, plu: 741006210507, nombre: 'Maíz dulce', variedad: 'Bandeja', categoria: 'VERDURA FRESCA' },
  { id: 114, plu: 741006210500, nombre: 'Manzana verde', variedad: 'Paquete', categoria: 'FRUTA FRESCA' },
  { id: 115, plu: 741006210497, nombre: 'Manzana gala', variedad: 'Paquete', categoria: 'FRUTA FRESCA' },
  { id: 116, plu: 741006210498, nombre: 'Manzana roja', variedad: 'Paquete', categoria: 'FRUTA FRESCA' },
  { id: 117, plu: 741006210109, nombre: 'Papa americana', variedad: 'Bolsa red', categoria: 'VERDURA FRESCA' },
  { id: 118, plu: 741006210476, nombre: 'Papa súper', variedad: 'Bolsa 3 lb', categoria: 'VERDURA FRESCA' },
  { id: 119, plu: 741006210447, nombre: 'Piña', variedad: 'Dorada und', categoria: 'FRUTA FRESCA' },
  { id: 120, plu: 741006210432, nombre: 'Rábano', variedad: 'Manojo', categoria: 'VERDURA FRESCA' },
  { id: 121, plu: 740115310082, nombre: 'Surtimontes', variedad: 'Bandeja', categoria: 'VERDURA FRESCA' },
  { id: 122, plu: 741006210505, nombre: 'Uva verde', variedad: 'Importada bandeja', categoria: 'FRUTA FRESCA' },
  { id: 123, plu: 8279120339, nombre: 'Papaya', variedad: 'Kaya paya und', categoria: 'FRUTA FRESCA' },
  { id: 124, plu: 741006210068, nombre: 'Zanahoria', variedad: 'Mini bandeja', categoria: 'VERDURA FRESCA' },
  { id: 125, plu: 741006210079, nombre: 'Pipián', variedad: 'Bandeja', categoria: 'VERDURA FRESCA' },
  { id: 126, plu: 741001004046, nombre: 'Champiñón', variedad: 'Bandeja', categoria: 'VERDURA FRESCA' },
  { id: 127, plu: 741340010041, nombre: 'Alfajores', variedad: 'Family 8', categoria: 'PANADERIA' },
  { id: 128, plu: 257021000000, nombre: 'Badú', variedad: 'Chilenita 350gr', categoria: 'PANADERIA' },
  { id: 129, plu: 257028000000, nombre: 'Badú', variedad: 'Mil hojas repostero', categoria: 'PANADERIA' },
  { id: 130, plu: 257802000000, nombre: 'Baguett', variedad: 'Ajo', categoria: 'PANADERIA' },
  { id: 131, plu: 257905000000, nombre: 'Baguett', variedad: 'Blanco grande', categoria: 'PANADERIA' },
  { id: 132, plu: 257801000000, nombre: 'Baguett', variedad: 'Finas hierbas', categoria: 'PANADERIA' },
  { id: 133, plu: 256920000000, nombre: 'Baguett', variedad: 'Rústico und', categoria: 'PANADERIA' },
  { id: 134, plu: 588, nombre: 'Budín', variedad: 'Porción', categoria: 'PANADERIA' },
  { id: 135, plu: 250141000000, nombre: 'Caja 6 donas', variedad: 'Variedad', categoria: 'PANADERIA' },
  { id: 136, plu: 741270050021, nombre: 'Cake tri sabor', variedad: '10 und', categoria: 'PANADERIA' },
  { id: 137, plu: 741270050020, nombre: 'Cake tri sabor', variedad: '8 und', categoria: 'PANADERIA' },
  { id: 138, plu: 741270050027, nombre: 'Cake tri sabor', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 139, plu: 740613167095, nombre: 'Cakito', variedad: 'Vainilla 6 ea', categoria: 'PANADERIA' },
  { id: 140, plu: 718, nombre: 'Caracol', variedad: 'Danés crema', categoria: 'PANADERIA' },
  { id: 141, plu: 615, nombre: 'Carcán', variedad: 'Galleta', categoria: 'PANADERIA' },
  { id: 142, plu: 122, nombre: 'Corona', variedad: 'Vainilla und', categoria: 'PANADERIA' },
  { id: 143, plu: 126, nombre: 'D Strudell', variedad: 'Crema', categoria: 'PANADERIA' },
  { id: 144, plu: 469, nombre: 'Delawere', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 145, plu: 612, nombre: 'Domino', variedad: 'Chocolate', categoria: 'PANADERIA' },
  { id: 146, plu: 253895000000, nombre: 'Domo cakito', variedad: 'Decorado 6', categoria: 'PANADERIA' },
  { id: 147, plu: 253877000000, nombre: 'Domo de alfajor', variedad: '8 und', categoria: 'PANADERIA' },
  { id: 148, plu: 250419000000, nombre: 'Domo de muffin', variedad: '10 und', categoria: 'PANADERIA' },
  { id: 149, plu: 259012000000, nombre: 'Domo panqué', variedad: 'Tropical', categoria: 'PANADERIA' },
  { id: 150, plu: 732, nombre: 'Dona', variedad: 'Decorada und', categoria: 'PANADERIA' },
  { id: 151, plu: 630, nombre: 'Flan', variedad: 'Queso', categoria: 'PANADERIA' },
  { id: 152, plu: 319, nombre: 'Galleta', variedad: 'De coco und', categoria: 'PANADERIA' },
  { id: 153, plu: 151, nombre: 'Galleta', variedad: 'Con avena', categoria: 'PANADERIA' },
  { id: 154, plu: 363, nombre: 'Galleta', variedad: 'De chochips', categoria: 'PANADERIA' },
  { id: 155, plu: 190, nombre: 'Gusanito', variedad: 'Dulce', categoria: 'PANADERIA' },
  { id: 156, plu: 520, nombre: 'Herradura', variedad: 'Piña und', categoria: 'PANADERIA' },
  { id: 157, plu: 280, nombre: 'Margarita', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 158, plu: 637, nombre: 'Muffin', variedad: 'Chocolate und', categoria: 'PANADERIA' },
  { id: 159, plu: 209, nombre: 'Muffin', variedad: 'Decorado und', categoria: 'PANADERIA' },
  { id: 160, plu: 638, nombre: 'Muffin', variedad: 'Vainilla und', categoria: 'PANADERIA' },
  { id: 161, plu: 285, nombre: 'Pan croissant', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 162, plu: 339, nombre: 'Pan integralito', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 163, plu: 325, nombre: 'Pan', variedad: 'Tortas mexicanas', categoria: 'PANADERIA' },
  { id: 164, plu: 250228000000, nombre: 'Pan baguette', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 165, plu: 716, nombre: 'Pan blanco', variedad: 'Integral mediano baguette', categoria: 'PANADERIA' },
  { id: 166, plu: 715, nombre: 'Pan blanco', variedad: 'Integral baguette', categoria: 'PANADERIA' },
  { id: 167, plu: 741340700847, nombre: 'Pan', variedad: 'Bollo blanco', categoria: 'PANADERIA' },
  { id: 168, plu: 596, nombre: 'Pan', variedad: 'Concha de vainilla', categoria: 'PANADERIA' },
  { id: 169, plu: 161, nombre: 'Pan', variedad: 'Marquesote und', categoria: 'PANADERIA' },
  { id: 170, plu: 627, nombre: 'Pan', variedad: 'Peperecha und', categoria: 'PANADERIA' },
  { id: 171, plu: 323, nombre: 'Pan pirujo', variedad: 'Con ajonjolí', categoria: 'PANADERIA' },
  { id: 172, plu: 266904000000, nombre: 'Pan pirujo', variedad: 'Paquete', categoria: 'PANADERIA' },
  { id: 173, plu: 253908000000, nombre: 'Pan', variedad: 'Queso y comino und', categoria: 'PANADERIA' },
  { id: 174, plu: 252200000000, nombre: 'Pan', variedad: 'Rosca', categoria: 'PANADERIA' },
  { id: 175, plu: 569, nombre: 'Pan', variedad: 'Telera und', categoria: 'PANADERIA' },
  { id: 176, plu: 250396000000, nombre: 'Panqué', variedad: 'Almendra semi', categoria: 'PANADERIA' },
  { id: 177, plu: 253863000000, nombre: 'Panqué', variedad: 'Pasas', categoria: 'PANADERIA' },
  { id: 178, plu: 253864000000, nombre: 'Panqué', variedad: 'Vainilla und', categoria: 'PANADERIA' },
  { id: 179, plu: 741340700620, nombre: 'Pañuelo', variedad: 'Grande und', categoria: 'PANADERIA' },
  { id: 180, plu: 250402000000, nombre: 'Pastel 1/4', variedad: 'Plancha rellena fresa', categoria: 'PANADERIA' },
  { id: 181, plu: 253886000000, nombre: 'Pastel choco', variedad: 'Galleta 10 porciones', categoria: 'PANADERIA' },
  { id: 182, plu: 253891000000, nombre: 'Pastel', variedad: 'Media plancha dulce leche', categoria: 'PANADERIA' },
  { id: 183, plu: 253885000000, nombre: 'Pastel', variedad: 'Caramelo N.16', categoria: 'PANADERIA' },
  { id: 184, plu: 256997000000, nombre: 'Roll', variedad: 'De pollo', categoria: 'PANADERIA' },
  { id: 185, plu: 317, nombre: 'Santaneca', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 186, plu: 625, nombre: 'Semita', variedad: 'Alta und', categoria: 'PANADERIA' },
  { id: 187, plu: 729, nombre: 'Strudel', variedad: 'Berries', categoria: 'PANADERIA' },
  { id: 188, plu: 124, nombre: 'Strudel', variedad: 'Manzana', categoria: 'PANADERIA' },
  { id: 189, plu: 126, nombre: 'Strudel', variedad: 'Crema', categoria: 'PANADERIA' },
  { id: 190, plu: 258601000000, nombre: 'Strudel', variedad: 'Piña und', categoria: 'PANADERIA' },
  { id: 191, plu: 253857000000, nombre: 'Strudel', variedad: 'Fresa', categoria: 'PANADERIA' },
  { id: 192, plu: 259009000000, nombre: 'Tartaleta', variedad: 'De fresa', categoria: 'PANADERIA' },
  { id: 193, plu: 259008000000, nombre: 'Tartaleta', variedad: 'De melocotón', categoria: 'PANADERIA' },
  { id: 194, plu: 25182000000, nombre: 'Tartaleta', variedad: 'Fresa/crema', categoria: 'PANADERIA' },
  { id: 195, plu: 253903000000, nombre: 'Torta', variedad: 'De queso', categoria: 'PANADERIA' },
  { id: 196, plu: 593, nombre: 'Torta', variedad: 'Seca und', categoria: 'PANADERIA' },
  { id: 197, plu: 717, nombre: 'Trenza', variedad: 'Danés con crema', categoria: 'PANADERIA' },
  { id: 198, plu: 336, nombre: 'Trenza', variedad: 'Und pescado', categoria: 'PANADERIA' },
  { id: 199, plu: 740613166500, nombre: 'Tres leches', variedad: 'Familiar', categoria: 'PANADERIA' },
  { id: 200, plu: 256921000000, nombre: 'Two pack', variedad: 'Baguette', categoria: 'PANADERIA' },
  { id: 201, plu: 266, nombre: 'Und salpor', variedad: 'Almendra', categoria: 'PANADERIA' },
  { id: 202, plu: 265, nombre: 'Und salpor', variedad: 'Arroz', categoria: 'PANADERIA' },
  { id: 203, plu: 250237000000, nombre: 'Viejita', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 204, plu: 257108000000, nombre: 'Viejitas', variedad: '5 und', categoria: 'PANADERIA' },
  { id: 205, plu: 257110000000, nombre: 'Volován', variedad: 'De pollo', categoria: 'PANADERIA' },
  { id: 206, plu: 301, nombre: 'Volován', variedad: 'De pollo', categoria: 'PANADERIA' },
  { id: 207, plu: 740613166704, nombre: 'Pastel', variedad: 'Chocolate', categoria: 'PANADERIA' },
  { id: 208, plu: 253887000000, nombre: 'Pastel', variedad: 'Chofres', categoria: 'PANADERIA' },
  { id: 209, plu: 740109080514, nombre: 'Pastel fru', variedad: 'Roj (surtido rojo)', categoria: 'PANADERIA' },
  { id: 210, plu: 740109080544, nombre: 'Pastel', variedad: 'Frutos rojos', categoria: 'PANADERIA' },
  { id: 211, plu: 740109080049, nombre: 'Pastel', variedad: 'Napolitano 14', categoria: 'PANADERIA' },
  { id: 212, plu: 740109080047, nombre: 'Pastel', variedad: 'Queso F16', categoria: 'PANADERIA' },
  { id: 213, plu: 740613166602, nombre: 'Pastel', variedad: 'Selva negra', categoria: 'PANADERIA' },
  { id: 214, plu: 309, nombre: 'Pegaditos', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 215, plu: 453, nombre: 'Picuda', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 216, plu: 618, nombre: 'Pirujo', variedad: 'Und', categoria: 'PANADERIA' },
  { id: 217, plu: 257105000000, nombre: 'Pirujón', variedad: '4 und', categoria: 'PANADERIA' },
  { id: 218, plu: 310, nombre: 'Pirujón', variedad: 'Hiper und', categoria: 'PANADERIA' },
  { id: 219, plu: 328, nombre: 'Porción', variedad: 'Pastel', categoria: 'PANADERIA' },
  { id: 220, plu: 253900000000, nombre: 'Postre', variedad: '3 leches', categoria: 'PANADERIA' },
  { id: 221, plu: 253902000000, nombre: 'Postre', variedad: '3 leches', categoria: 'PANADERIA' },
  { id: 222, plu: 250343000000, nombre: 'Postre', variedad: '3 leches', categoria: 'PANADERIA' },
  { id: 223, plu: 250337000000, nombre: 'Postre', variedad: '3 leches', categoria: 'PANADERIA' },
  { id: 224, plu: 250352000000, nombre: 'Postre', variedad: 'Tres leches', categoria: 'PANADERIA' },
  { id: 225, plu: 253894000000, nombre: 'Repostería', variedad: 'Caramelo', categoria: 'PANADERIA' },
  { id: 226, plu: 259013000000, nombre: 'Repostería', variedad: 'Chocolate', categoria: 'PANADERIA' },
  { id: 227, plu: 250479000000, nombre: 'Repostería', variedad: 'Vainilla', categoria: 'PANADERIA' },
  { id: 228, plu: 250183000000, nombre: 'Mini baguett', variedad: 'Ajo', categoria: 'PANADERIA' },
  { id: 229, plu: 253890000000, nombre: 'Mini baguett', variedad: 'Blanco', categoria: 'PANADERIA' },
  { id: 230, plu: 258852000000, nombre: 'Pan', variedad: 'Pirujón GT', categoria: 'PANADERIA' },
  ];

  /* ---------------------------------------------------------
     2. REFERENCIAS AL DOM
  --------------------------------------------------------- */
  const tabSearchBtn   = document.getElementById('tabSearchBtn');
  const tabCatalogBtn  = document.getElementById('tabCatalogBtn');
  const searchView     = document.getElementById('searchView');
  const catalogView    = document.getElementById('catalogView');

  const searchInput    = document.getElementById('searchInput');
  const searchResults  = document.getElementById('searchResults');

  const catalogGrid    = document.getElementById('catalogGrid');
  const catalogSearch  = document.getElementById('catalogSearch');

  const lightbox        = document.getElementById('lightbox');
  const lightboxImg     = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxClose   = document.getElementById('lightboxClose');

  /* ---------------------------------------------------------
     3. BUSCADOR DE PRODUCTOS
     Agrupa el inventario por "nombre" (ej. Tomate, Manzana) y
     dentro de cada grupo muestra sus variedades por separado,
     cada una con su propio código PLU.
  --------------------------------------------------------- */
  function agruparPorNombre(lista) {
    const grupos = {};
    lista.forEach(p => {
      if (!grupos[p.nombre]) grupos[p.nombre] = [];
      grupos[p.nombre].push(p);
    });
    return grupos;
  }

  function claseCategoria(categoria) {
    if (categoria === 'PANADERIA') return 'category-tag--panaderia';
    return '';
  }

  function renderBusqueda(filtro = '') {
    const filtroLower = filtro.trim().toLowerCase();

    const coincide = (p) =>
      p.nombre.toLowerCase().includes(filtroLower) ||
      p.variedad.toLowerCase().includes(filtroLower);

    const listaFiltrada = filtroLower ? inventario.filter(coincide) : inventario;

    if (listaFiltrada.length === 0) {
      searchResults.innerHTML = '<p class="catalog-empty">No hay productos que coincidan con tu búsqueda.</p>';
      return;
    }

    const grupos = agruparPorNombre(listaFiltrada);
    const nombres = Object.keys(grupos).sort((a, b) => a.localeCompare(b, 'es'));

    const html = nombres.map(nombre => {
      const variedades = grupos[nombre].sort((a, b) => a.variedad.localeCompare(b.variedad, 'es'));

      const filasHtml = variedades.map(p => {
        const codigoLength = String(p.plu).length;
        const claseCodigoLargo = codigoLength > 6 ? 'plu-box__code--long' : '';
        return `
          <div class="search-row">
            <div class="search-row__info">
              <span class="category-tag search-row__tag ${claseCategoria(p.categoria)}">${p.categoria}</span>
              <p class="search-row__variedad">${p.variedad}</p>
            </div>
            <div class="plu-box plu-box--compact">
              <span class="plu-box__label">PLU</span>
              <span class="plu-box__code ${claseCodigoLargo}">${p.plu}</span>
            </div>
          </div>
        `;
      }).join('');

      return `
        <div class="search-group">
          <h3 class="search-group__title">${nombre}<span class="catalog-group__count">${variedades.length} variedad${variedades.length !== 1 ? 'es' : ''}</span></h3>
          <div class="search-group__list">${filasHtml}</div>
        </div>
      `;
    }).join('');

    searchResults.innerHTML = html;
  }

  /* ---------------------------------------------------------
     4. CATÁLOGO DE FOTOS DE REFERENCIA
     Usa el objeto CATALOGO_FOTOS (definido en catalogo-data.js) con la
     forma { "nombre_carpeta": ["1.jpg", "2.jpg", ...], ... }
  --------------------------------------------------------- */
  function nombreLegible(slug) {
    return slug.replace(/_/g, ' ');
  }

  function renderCatalogo(filtro = '') {
    if (typeof CATALOGO_FOTOS === 'undefined') {
      catalogGrid.innerHTML = '<p class="catalog-empty">No se encontraron fotos de catálogo.</p>';
      return;
    }

    const filtroLower = filtro.trim().toLowerCase();
    const carpetas = Object.keys(CATALOGO_FOTOS).sort();
    const carpetasFiltradas = carpetas.filter(c => nombreLegible(c).toLowerCase().includes(filtroLower));

    if (carpetasFiltradas.length === 0) {
      catalogGrid.innerHTML = '<p class="catalog-empty">No hay productos que coincidan con tu búsqueda.</p>';
      return;
    }

    const html = carpetasFiltradas.map(carpeta => {
      const fotos = CATALOGO_FOTOS[carpeta];
      const fotosHtml = fotos.map(fname => `
        <button type="button" class="catalog-photo" data-carpeta="${carpeta}" data-archivo="${fname}">
          <img src="images/catalogo/${carpeta}/${fname}" alt="${nombreLegible(carpeta)}" loading="lazy">
        </button>
      `).join('');

      return `
        <div class="catalog-group">
          <h3 class="catalog-group__title">${nombreLegible(carpeta)}<span class="catalog-group__count">${fotos.length} foto${fotos.length !== 1 ? 's' : ''}</span></h3>
          <div class="catalog-group__photos">${fotosHtml}</div>
        </div>
      `;
    }).join('');

    catalogGrid.innerHTML = html;

    catalogGrid.querySelectorAll('.catalog-photo').forEach(btn => {
      btn.addEventListener('click', () => {
        const carpeta = btn.dataset.carpeta;
        const archivo = btn.dataset.archivo;
        abrirLightbox(carpeta, archivo);
      });
    });
  }

  function abrirLightbox(carpeta, archivo) {
    lightboxImg.src = `images/catalogo/${carpeta}/${archivo}`;
    lightboxCaption.textContent = nombreLegible(carpeta);
    lightbox.hidden = false;
  }

  function cerrarLightbox() {
    lightbox.hidden = true;
    lightboxImg.src = '';
  }

  /* ---------------------------------------------------------
     5. PESTAÑAS: BUSCAR / CATÁLOGO
  --------------------------------------------------------- */
  function mostrarVista(vista) {
    const esBusqueda = vista === 'search';
    searchView.classList.toggle('app-main--hidden', !esBusqueda);
    catalogView.classList.toggle('app-main--hidden', esBusqueda);
    tabSearchBtn.classList.toggle('is-active', esBusqueda);
    tabCatalogBtn.classList.toggle('is-active', !esBusqueda);

    if (!esBusqueda) {
      renderCatalogo(catalogSearch.value);
    }
  }

  /* ---------------------------------------------------------
     6. EVENTOS
  --------------------------------------------------------- */
  tabSearchBtn.addEventListener('click', () => mostrarVista('search'));
  tabCatalogBtn.addEventListener('click', () => mostrarVista('catalog'));
  searchInput.addEventListener('input', () => renderBusqueda(searchInput.value));
  catalogSearch.addEventListener('input', () => renderCatalogo(catalogSearch.value));
  lightboxClose.addEventListener('click', cerrarLightbox);
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) cerrarLightbox(); });

  // Primera pintura al abrir la app
  renderBusqueda('');

})();
