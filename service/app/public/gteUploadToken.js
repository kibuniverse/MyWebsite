const accessKey = 'skksYTMX_1HVyt3hNC5HL2edHfmVTb65rW_hmBon'
const secretKey = 'n23-Oe9e8oF3SoCqX7Uv8NNBoFydGJNV09cQggk7'
const mac = new qiniu.auth.digest.Mac(accessKey, secretKey)
const options = {
    scope: bucket,
    expires: 7200  // 两小时
}
const putPolicy = new qiniu.rs.PutPolicy(options)
const uploadToken = putPolicy.uploadToken(mac)

module.export = uploadToken