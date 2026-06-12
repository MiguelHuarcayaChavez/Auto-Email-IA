# Auto-Email-IA
Automatización con n8n para leer correos, extraer información, procesar con IA y mostrar en un dashboard.

# Sistema Automatizado de Triaje para Tele-Interconsultas

Este proyecto es un MVP (Producto Mínimo Viable) de un **sistema de automatización y triaje médico** impulsado por Inteligencia Artificial. El objetivo principal es procesar de forma masiva, automática y eficiente los correos entrantes con solicitudes de tele-interconsultas que incluyen documentos clínicos (PDFs), analizarlos con un modelo de lenguaje avanzado y centralizar los resultados en un panel web para su visualización.



## Características Clave
*   **Automatización Serverless:** No requiere de un backend tradicional (Node.js, Python, etc.) ni de bases de datos complejas para la persistencia.
*   **Procesamiento de Documentos Pesados:** Incluye un filtro inteligente en Python que optimiza el tamaño del texto para evitar saturaciones de cuota en las APIs.
*   **Triaje con IA de Alta Velocidad:** Utiliza el modelo Llama 3.1 a través de Groq para interpretar registros clínicos de manera instantánea.
*   **Sincronización en Tiempo Real:** Interfaz frontend conectada directamente a la infraestructura de almacenamiento en la nube.



## Arquitectura del Sistema

El flujo de información opera de manera cíclica y 100% automatizada bajo la siguiente estructura:

1.  **Captura (Microsoft Outlook Trigger):** n8n revisa la bandeja de entrada de forma periódica en busca de correos de interconsulta no leídos.
2.  **Extracción (Extract From File):** Se procesan y descargan los archivos adjuntos convirtiendo los PDFs médicos en texto plano.
3.  **Optimización (Python Code):** Un script corta el texto extraído a los caracteres clave para optimizar la eficiencia y los costos de la API.
4.  **Análisis Clínico (Groq / Llama 3.1):** La IA analiza los síntomas, determina el servicio solicitado original, recomienda la especialidad de destino real y sugiere un tratamiento preliminar.
5.  **Almacenamiento (Google Sheets):** Los resultados estructurados se guardan inmediatamente en una fila del documento.
6.  **Visualización (Frontend):** La interfaz web lee los datos publicados para renderizar tarjetas interactivas.


## Demostración Visual

### 1. Flujo de Trabajo en n8n

![Flujo Completo de n8n](/docs/Flujo%20Completo%20de%20n8n.png)

### 2. Panel Web de Visualización (Frontend)

![Dashboard de Interconsultas](/docs/Dashboard%20de%20Interconsultas.png)

### 3. Registro de Datos (Google Sheets)

![Base de Datos en Google Sheets](/docs/Base%20de%20Datos%20en%20Google%20Sheets.png)



