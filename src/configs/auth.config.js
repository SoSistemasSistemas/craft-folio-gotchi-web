const { API_PORT } = process.env;

module.exports={
    "facebook_api_key": "FB APP ID",
    "facebook_api_secret": "FB API SECRET",
    "callback_url": `http://localhost:${API_PORT}/auth/facebook/callback`
}