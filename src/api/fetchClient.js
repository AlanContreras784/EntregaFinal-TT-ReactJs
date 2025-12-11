/**
 * fetchClient
 * -----------
 * Wrapper personalizado de fetch que:
 * - Agrega automáticamente el token de autenticación desde localStorage
 * - Maneja errores comunes (401, 403, 500, etc.)
 * - Redirige al login cuando la sesión expira o el token es inválido
 * - Devuelve JSON de forma segura (sin romper si la respuesta no tiene JSON)
 *
 * @param {string} url - La URL a la cual se hará la petición
 * @param {object} options - Configuración opcional (method, body, headers, etc.)
 * @returns {Promise<any>} - La respuesta en formato JSON o null
 */
export const fetchClient = async (url, options = {}) => {
    
    // 1. Obtener el token de autenticación almacenado en el navegador
    const token = localStorage.getItem("token");

    // 2. Combinar headers:
    //    - Content-Type por defecto
    //    - Headers adicionales enviados desde "options"
    //    - Token de autorización si existe
    const headers = {
        "Content-Type": "application/json",
        ...(options.headers || {}),
        ...(token ? { "Authorization": `Bearer ${token}` } : {})
    };

    // 3. Construir la configuración final para fetch
    const config = {
        ...options,
        headers
    };

    try {
        // 4. Realizar la petición
        const response = await fetch(url, config);

        // -------------------------------
        //     MANEJO DE ESTADOS HTTP
        // -------------------------------

        // 5. Token expirado → HTTP 401
        if (response.status === 401) {
            alert("Tu sesión ha expirado. Volvé a iniciar sesión.");
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }

        // 6. Token inválido o sin permisos → HTTP 403
        if (response.status === 403) {
            alert("No tenés permisos o tu token es inválido.");
            localStorage.removeItem("token");
            window.location.href = "/login";
            return;
        }

        // 7. Si la respuesta no es OK (400, 404, 500, etc.)
        if (!response.ok) {
            // Intentar leer el mensaje de error del backend
            const errorData = await response.json().catch(() => null);

            // Lanzar mensaje del backend si existe, o uno genérico
            throw new Error(errorData?.message || "Error en la solicitud.");
        }

        // -------------------------------
        //     RESPUESTA EXITOSA
        // -------------------------------

        // 8. Intentar convertir la respuesta a JSON
        //    (si falla, se devuelve null sin romper la app)
        return await response.json().catch(() => null);

    } catch (err) {
        // 9. Captura y log de errores de red o del fetch
        console.error("Error en fetchClient:", err);
        throw err;
    }
};
