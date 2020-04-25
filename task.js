const https = require('https')
const request = require('request')
const {parse} = require('node-html-parser')
const { JSDOM } = require("jsdom")
const jquery = require( "jquery" )
const zlib = require('zlib')
const mail = require('./mail')
const playSound = require('play-sound')(opts = { player: "C:\/MPlayer_Windows\/mplayer\/MPlayer.exe"})
var crypto = require('crypto');
// var content = '123456';
// var result = crypto.createHash('md5').update(content).digest("hex")
// console.log(result);  //e10adc3949ba59abbe56e057f20f883e
const AMAZON_URL = 'https://www.amazon.cn/s?k=switch&i=videogames&rh=n%3A897415051%2Cn%3A1895872071%2Cp_n_special_merchandising_browse-bin%3A1414288071&s=date-desc-rank&dc&qid=1587468357&rnid=2122563051&ref=sr_st_date-desc-rank'
const MD5_LIST = [
  'ee895682d07d7fb6dbcf3758762e50ba',
  'aba0cd239f55e771e072d26108cd96a9',
  '3f22d1d8393ebfef5781eefa2961b75a',
  '37329a4afcc63ccbbba0bf1b3ac022e3',
  'd65cc689f5d6d1b51404e629c3649164',
  'c4bb427528161019e9bcf6b7d35545f7',
  '4802400c1f3330185ea01ef993fc9c7b',
  '66383caf62347543b051d1d8af2d2c7d',
  '591769344f5ee7e9c15e4db872f7d14e',
  'b69e50d703c4d7ad6715aedbb2157405',
  'd102057d059ad028adca2d56497ea646',
  'b7ae7f488c98f5dad4b3782d43399ffa',
  '961f02f43579ffc0c2c07e1afb0787d3',
  'ed6503c1b8d884f8078c7ea27807f71a',
  'a1e410e043e80ecfcb0b2879403b4728',
  'e1e364873d8e088e1cff5bcb9d0ccdc6',
  '0063f8aa3f43bc6115ef913dcfd382a4',
  'd41d8cd98f00b204e9800998ecf8427e',
]

const MAX_ALARM_TIMES = 6
let alramTimes = 0

function compare(body) {
  // console.error(body)
  const $ = jquery(new JSDOM(body).window)
  const list = $('.celwidget>.s-latency-cf-section h2.s-line-clamp-2>.a-text-normal>.a-text-normal')
  let arr = []

  for (row of list) {
    // console.error(row.textContent)
    arr.push(row.textContent)
  }

  let md5Str = crypto.createHash('md5').update(arr.join(',')).digest("hex")
  // md5Str += 'a'
  // console.error(md5Str)
  if(MD5_LIST.indexOf(md5Str) === -1) {
    alramTimes += 1

    if (alramTimes > MAX_ALARM_TIMES) {
      alramTimes = 0
      MD5_LIST.push(md5Str)
      return
    }

    console.error(md5Str)
    mail.send(arr.join('\n'))
    alram()
    // console.error('>>>>>>>>>>>>>>>>>>>>>\n\n\n\n\n\n\n>>>>>>>>>>>>')
    console.error(arr)
  }
  // console.error("pro len: ",list.length)
}

function alram() {
  playSound.play(process.cwd() + '\\warn.mp3', function(err){
    if (err) console.error(err)
    // console.error('done')
  })
}

function task() {
  const headers = {
    // 'Content-Type': 'application/json',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9',
    // 'Accept-Encoding': '*',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Cookie': 'session-id=459-6511256-0741311; ubid-acbcn=461-9656925-9904626; s_pers=%20s_fid%3D4F45A9AE6AFA3AF8-05EA0557F4DBD180%7C1744789792235%3B%20s_dl%3D1%7C1587025192236%3B%20gpv_page%3DCN%253AAS%253AGS-homepage%7C1587025192239%3B%20s_ev15%3D%255B%255B%2527NSBaidu%2527%252C%25271587023369749%2527%255D%252C%255B%2527SECNSOAbaidupc2398%2527%252C%25271587023392246%2527%255D%255D%7C1744789792246%3B; i18n-prefs=CNY; x-wl-uid=1Cn7gDYamB1FeFgdWwWZUiuAvCmEID52SNerAuvIreFZRZF/VVlVIpR1pEhB6rUscgTTusqA4wvA=; lc-acbcn=zh_CN; session-token=ZkhgJGRTyr+32geAvystyqLq9ySXtV4CcC6cylXLn1K7MGoD1vdaVmiw9+CVNVHLZ/hFVhixVRozVHNnB63H7LM5n0Gs9YU2BDUv1G5xdciDKed3gJtSWPPxY6uiB+Fx5J98HZuoHBY2Yy6gnWRmd4ypEo74B4SQMbT95C9LduerrFfJtKSsJqtId+MPFPDY; SL_GWPT_Show_Hide_tmp=1; SL_wptGlobTipTmp=1; x-amz-captcha-1=1587155042110878; x-amz-captcha-2=g4HHsDJsLzHGWfm7bqDu8w==; csm-hit=tb:s-EGDTNNBGKWW7XT60J7B4|1587147925957&t:1587147926227&adb:adblk_no; session-id-time=2082729601l',
    'Host': 'www.amazon.cn',
    'Pragma': 'no-cache',
    'Referer': 'https://www.amazon.cn/s?k=switch&i=videogames&rh=n%3A897415051%2Cn%3A1895872071%2Cp_n_special_merchandising_browse-bin%3A1414288071&s=date-desc-rank&dc&qid=1587468357&rnid=2122563051&ref=sr_st_date-desc-rank',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'same-origin',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-User':'?1',
    'Upgrade-Insecure-Requests': 1,
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.113 Safari/537.36',
  }

  const options = {
    url: AMAZON_URL,
    headers: headers,
    encoding : null,
  }

  try{
    request.get(options, (err, res, body) => {
      // res.setEncoding('utf-8')
      // console.log('状态码:', res.statusCode);
      // console.log('请求头:', res.headers);
      // let body = ''
      // res.on('data', (d) => {
      //   body += d
      // });
      
      // res.on('end', () => {
      //   zlib.unzip(body, function(err, buffer) {
      //     console.error(err)
      //     // console.log(buffer.toString())
      //   })
      //   // console.error(body.toString())
      //   // compare(body)
      // })
      // console.log(body.toString())
      if(body){
        zlib.unzip(body, function(err, buffer) {
          compare(buffer.toString())
        })
      }
    }).on('error', (e) => {
      alram()
      console.error(e);
    })
  } catch (netERR) {
    alram()
    console.error('networkExp:', netERR)
  }

}

function run(time) {
  setTimeout(function() {
    // const randTime = Math.random() * 6000
    task()
    run(10000)
  }, time)
}


run(3000)