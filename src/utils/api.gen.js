function Generate_API_SECRET(){
    var API_SECRET = ''
    let chars = 'aABbCcdDeEfFgGhHiIjJkKlLmMnNoOpPqQrRsStTuUvVwWxXyYzZ_.-?'
    for(var i = 0; i <= chars.length; i++){
        c = chars[Math.floor(Math.random() * chars.length)]
        API_SECRET += c;
    }
    return API_SECRET;
}

function Generate_API_KEY(){
    var API_KEY = ''
    let nums = '0123456789'
    
    for(var i = 0; i <= nums.length; i++){
       n = nums[Math.floor(Math.random() * nums.length)]
       n2 = nums[Math.floor(Math.random() * nums.length)]
        API_KEY += n+n2;
    } 
    return API_KEY;
}

module.exports = {Generate_API_KEY, Generate_API_SECRET}