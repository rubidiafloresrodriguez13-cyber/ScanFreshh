# ScanFresh — Buscador y catálogo de productos

## Estructura del proyecto
```
fruteria-scanner/
├── index.html
├── styles.css
├── app.js
├── catalogo-data.js
├── images/
│   └── catalogo/
│       ├── tomate/
│       ├── manzana_roja/
│       └── ... (103 carpetas de producto)
└── README.md
```

## Qué hace la app

**Pestaña "Buscar":** escribe el nombre de un producto (ej. "tomate", "manzana", "pan") y la app te muestra todas sus variedades por separado, cada una con su propio código PLU. Por ejemplo, buscar "manzana" te muestra Fuji, Gala, Pink Lady, Roja, Verde, etc., cada una como una fila independiente con su PLU.

**Pestaña "Catálogo":** tus 203 fotos reales organizadas en 103 grupos por producto, con buscador y vista ampliada al tocar cada foto — útil como referencia visual para identificar variedades.

La base de datos de 230 productos reales (frutas, verduras y panadería) está en el arreglo `inventario` dentro de `app.js`. Para editar, agregar o quitar productos, edita esa lista directamente (cada línea tiene `id`, `plu`, `nombre`, `variedad`, `categoria`).

## Cómo ejecutarlo en VS Code (Live Server)

1. Abre la carpeta `fruteria-scanner` completa en VS Code (**Archivo → Abrir carpeta...**).
2. Instala la extensión **Live Server** (de Ritwick Dey) si no la tienes.
3. Haz clic derecho sobre `index.html` → **"Open with Live Server"**.
4. Se abrirá tu navegador en `http://127.0.0.1:5500/index.html`.

## Cómo subir los cambios a GitHub

1. Ve a tu repositorio en github.com.
2. **Add file → Upload files**.
3. Arrastra `index.html`, `styles.css`, `app.js`, `catalogo-data.js`, `README.md` y la carpeta `images` completa (son ~200 archivos de fotos, espera a que termine de cargar antes de hacer Commit).
4. Presiona **Commit changes**.
5. En 1-2 minutos tu link público (`https://tu-usuario.github.io/tu-repo/`) queda actualizado.

## Nota sobre reconocimiento por cámara/IA

Se quitó por ahora el escaneo con cámara y el reconocimiento con IA (Teachable Machine), ya que sin suficientes fotos por producto (idealmente 15-20 cada uno) no daba resultados confiables. El buscador por nombre es, por ahora, la forma más práctica y precisa de encontrar el PLU correcto. Si más adelante tomas más fotos y quieres retomar el reconocimiento por IA, dímelo y lo volvemos a integrar.
