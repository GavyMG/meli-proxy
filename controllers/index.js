require('dotenv').config()
const url = require('url')
const needle = require('needle')

// Env vars
const API_BASE_URL = process.env.API_BASE_URL



exports.sendRequest = async (req, res, netx) => {
    try {
        var new_req_url = `${API_BASE_URL}${url.parse(req.url).pathname}`
        if (url.parse(req.url).query){
            const params = new URLSearchParams(url.parse(req.url).query)
            new_req_url = `${API_BASE_URL}${url.parse(req.url).pathname}?${params}`
        }
            
        if (process.NODE_ENV !== 'production') {
            console.log(`REQUEST: ${new_req_url}`)
        }
        const apiRes = await needle(req.method, new_req_url)
        const data = apiRes.body

        res.status(200).json(data)
        
    } catch (error){
        res.status(500).json({error})
    }
    
}