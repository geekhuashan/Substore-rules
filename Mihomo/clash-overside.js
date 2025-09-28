/***
 * Clash Verge Rev 全局扩展脚本（懒人配置）/ Mihomo Party 覆写脚本
 * URL: https://github.com/dahaha-365/YaNet/
 */

/**
 * 整个脚本的总开关，在Mihomo Party使用的话，请保持为true
 * true = 启用
 * false = 禁用
 */
const enable = true

/**
 * 地区配置，通过regex匹配代理节点名称
 * regex会有一定概率误判，自己调整一下吧
 * excludeHighPercentage是排除高倍率节点的开关，只对地区分组有效
 * 倍率大于regions里的ratioLimit值的代理节点会被排除
 */
const regionOptions = {
  excludeHighPercentage: true,
  regions: [
    {
      name: '🇭🇰 香港节点',
      regex: /港|🇭🇰|hk|hongkong|hong kong/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Hong_Kong.png',
    },
    {
      name: '🇺🇲 美国节点',
      regex: /美|🇺🇸|us|united state|america/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_States.png',
    },
    {
      name: '🇯🇵 日本节点',
      regex: /日本|🇯🇵|jp|japan/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Japan.png',
    },
    {
      name: '🇰🇷 韩国节点',
      regex: /韩|🇰🇷|kr|korea/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Korea.png',
    },
    {
      name: '🇸🇬 狮城节点',
      regex: /新加坡|🇸🇬|sg|singapore/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Singapore.png',
    },
    {
      name: '🇨🇳 台湾节点',
      regex: /台湾|🇹🇼|tw|taiwan|tai wan/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/China.png',
    },
    {
      name: 'GB英国',
      regex: /英|🇬🇧|uk|united kingdom|great britain/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/United_Kingdom.png',
    },
    {
      name: 'DE德国',
      regex: /德国|🇩🇪|de|germany/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Germany.png',
    },
    {
      name: 'MY马来西亚',
      regex: /马来|🇲🇾|my|malaysia/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Malaysia.png',
    },
    {
      name: 'TK土耳其',
      regex: /土耳其|🇹🇷|tk|turkey/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Turkey.png',
    },
    {
      name: '📶 ISP节点',
      regex: /ISP/i,
      ratioLimit: 2,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Network_2.png',
    },
  ],
}

/**
 * 其实两组DNS就够了，一组国内，一组国外
 * defaultDNS是用来解析DNS的，必须为IP
 * DNS最好不要超过两个，从业界某知名APP的文档里学的
 */
const defaultDNS = ['tls://223.5.5.5']

const chinaDNS = ['119.29.29.29', '223.5.5.5']

const foreignDNS = ['https://120.53.53.53/dns-query', 'https://223.5.5.5/dns-query']

/**
 * DNS相关配置
 */
const dnsConfig = {
  enable: true,
  listen: ':1053',
  ipv6: true,
  'prefer-h3': true,
  'use-hosts': true,
  'use-system-hosts': true,
  'respect-rules': true,
  'enhanced-mode': 'fake-ip',
  'fake-ip-range': '198.18.0.1/16',
  'fake-ip-filter': ['*', '+.lan', '+.local', '+.market.xiaomi.com'],
  // 'default-nameserver': [...defaultDNS],
  nameserver: [...foreignDNS],
  'proxy-server-nameserver': [...foreignDNS],
  /**
   * 这里对域名解析进行分流
   * 由于默认dns是国外的了，只需要把国内ip和域名分流到国内dns
   */
  'nameserver-policy': {
    'geosite:private': 'system',
    'geosite:cn,steam@cn,category-games@cn,microsoft@cn,apple@cn': chinaDNS,
  },
}

// 规则集通用配置
const ruleProviderCommon = {
  type: 'http',
  format: 'yaml',
  interval: 86400,
}

// 代理组通用配置
const groupBaseOption = {
  interval: 300,
  timeout: 3000,
  url: 'http://cp.cloudflare.com/generate_204',
  lazy: true,
  'max-failed-times': 3,
  hidden: false,
}

const remoteRuleSets = [
  {
    key: 'preHuashan',
    url: 'https://raw.githubusercontent.com/geekhuashan/Proxy-Rules/refs/heads/main/Surge/Surge%203/Provider/pre-huashan.list',
    path: './ruleset/GeekHuashan/pre-huashan.list',
    target: '🚀 节点选择',
  },
  {
    key: 'huashanMain',
    url: 'https://raw.githubusercontent.com/geekhuashan/Proxy-Rules/refs/heads/main/Surge/Surge%203/Provider/huashan.list',
    path: './ruleset/GeekHuashan/huashan.list',
    target: '👨‍🎓 huashan',
  },
  {
    key: 'dlerPayPal',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/PayPal.list',
    path: './ruleset/Dler/PayPal.list',
    target: '👨‍🎓 huashan',
  },
  {
    key: 'dlerAISuite',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/AI%20Suite.list',
    path: './ruleset/Dler/AI-Suite.list',
    target: '💬 OpenAi',
  },
  {
    key: 'geekGoogle',
    url: 'https://raw.githubusercontent.com/geekhuashan/Proxy-Rules/refs/heads/main/Surge/Surge%203/Provider/Google.list',
    path: './ruleset/GeekHuashan/Google.list',
    target: '🔍 谷歌搜索',
  },
  {
    key: 'geekTalkatone',
    url: 'https://raw.githubusercontent.com/geekhuashan/Proxy-Rules/refs/heads/main/Surge/Surge%203/Provider/Talkatone.list',
    path: './ruleset/GeekHuashan/Talkatone.list',
    target: '📞 talkatone',
  },
  {
    key: 'dlerAdBlock',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/AdBlock.list',
    path: './ruleset/Dler/AdBlock.list',
    target: '🛑 广告拦截',
  },
  {
    key: 'dlerNetflix',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Netflix.list',
    path: './ruleset/Dler/Media/Netflix.list',
    target: '🎥 奈飞视频',
  },
  {
    key: 'dlerYouTube',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/YouTube.list',
    path: './ruleset/Dler/Media/YouTube.list',
    target: '📹 油管视频',
  },
  {
    key: 'dlerBilibiliRaw',
    url: 'https://raw.githubusercontent.com/dler-io/Rules/main/Surge/Surge%203/Provider/Media/Bilibili.list',
    path: './ruleset/Dler/Media/Bilibili.raw.list',
    target: '🌏 国内媒体',
  },
]

const domesticMediaRuleSets = [
  {
    key: 'dlerBilibiliAsia',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Bilibili.list',
    path: './ruleset/Dler/Media/Bilibili.asia.list',
  },
  {
    key: 'dlerIQ',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/IQ.list',
    path: './ruleset/Dler/Media/IQ.list',
  },
  {
    key: 'dlerIQIYI',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/IQIYI.list',
    path: './ruleset/Dler/Media/IQIYI.list',
  },
  {
    key: 'dlerLetv',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Letv.list',
    path: './ruleset/Dler/Media/Letv.list',
  },
  {
    key: 'dlerMOO',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/MOO.list',
    path: './ruleset/Dler/Media/MOO.list',
  },
  {
    key: 'dlerTencentVideo',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Tencent%20Video.list',
    path: './ruleset/Dler/Media/Tencent-Video.list',
  },
  {
    key: 'dlerYouku',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Youku.list',
    path: './ruleset/Dler/Media/Youku.list',
  },
  {
    key: 'dlerFoxPlus',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Fox%2B.list',
    path: './ruleset/Dler/Media/FoxPlus.list',
  },
  {
    key: 'dlerHuluJapan',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Hulu%20Japan.list',
    path: './ruleset/Dler/Media/Hulu-Japan.list',
  },
  {
    key: 'dlerJaponx',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Japonx.list',
    path: './ruleset/Dler/Media/Japonx.list',
  },
  {
    key: 'dlerJOOX',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/JOOX.list',
    path: './ruleset/Dler/Media/JOOX.list',
  },
  {
    key: 'dlerKKBOX',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/KKBOX.list',
    path: './ruleset/Dler/Media/KKBOX.list',
  },
  {
    key: 'dlerKKTV',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/KKTV.list',
    path: './ruleset/Dler/Media/KKTV.list',
  },
  {
    key: 'dlerLineTV',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Line%20TV.list',
    path: './ruleset/Dler/Media/Line-TV.list',
  },
  {
    key: 'dlerMyTVSuper',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/myTV%20SUPER.list',
    path: './ruleset/Dler/Media/myTV-SUPER.list',
  },
  {
    key: 'dlerNiconico',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Niconico.list',
    path: './ruleset/Dler/Media/Niconico.list',
  },
  {
    key: 'dlerViuTV',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/ViuTV.list',
    path: './ruleset/Dler/Media/ViuTV.list',
  },
]

const globalMediaRuleSets = [
  {
    key: 'dlerABC',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/ABC.list',
    path: './ruleset/Dler/Media/ABC.list',
  },
  {
    key: 'dlerAmazon',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Amazon.list',
    path: './ruleset/Dler/Media/Amazon.list',
  },
  {
    key: 'dlerBBCiPlayer',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/BBC%20iPlayer.list',
    path: './ruleset/Dler/Media/BBC-iPlayer.list',
  },
  {
    key: 'dlerDAZN',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/DAZN.list',
    path: './ruleset/Dler/Media/DAZN.list',
  },
  {
    key: 'dlerDiscoveryPlus',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Discovery%20Plus.list',
    path: './ruleset/Dler/Media/Discovery-Plus.list',
  },
  {
    key: 'dlerEncoreTVB',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/encoreTVB.list',
    path: './ruleset/Dler/Media/encoreTVB.list',
  },
  {
    key: 'dlerF1TV',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/F1%20TV.list',
    path: './ruleset/Dler/Media/F1-TV.list',
  },
  {
    key: 'dlerFoxNow',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Fox%20Now.list',
    path: './ruleset/Dler/Media/Fox-Now.list',
  },
  {
    key: 'dlerHulu',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Hulu.list',
    path: './ruleset/Dler/Media/Hulu.list',
  },
  {
    key: 'dlerPandora',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Pandora.list',
    path: './ruleset/Dler/Media/Pandora.list',
  },
  {
    key: 'dlerPBS',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/PBS.list',
    path: './ruleset/Dler/Media/PBS.list',
  },
  {
    key: 'dlerPornhub',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Pornhub.list',
    path: './ruleset/Dler/Media/Pornhub.list',
  },
  {
    key: 'dlerSoundcloud',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Soundcloud.list',
    path: './ruleset/Dler/Media/Soundcloud.list',
  },
  {
    key: 'geekEmby',
    url: 'https://raw.githubusercontent.com/geekhuashan/Proxy-Rules/refs/heads/main/Surge/Surge%203/Provider/emby.list',
    path: './ruleset/GeekHuashan/emby.list',
  },
]

const appleRuleSets = [
  {
    key: 'dlerAppleMusic',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Apple%20Music.list',
    path: './ruleset/Dler/Media/Apple-Music.list',
  },
  {
    key: 'dlerAppleNews',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Apple%20News.list',
    path: './ruleset/Dler/Media/Apple-News.list',
  },
  {
    key: 'dlerAppleTV',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Media/Apple%20TV.list',
    path: './ruleset/Dler/Media/Apple-TV.list',
  },
  {
    key: 'dlerAppleService',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Apple.list',
    path: './ruleset/Dler/Apple.list',
  },
]

const generalServiceRuleSets = [
  {
    key: 'dlerTelegram',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Telegram.list',
    path: './ruleset/Dler/Telegram.list',
    target: '🚀 节点选择',
  },
  {
    key: 'dlerCrypto',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Crypto.list',
    path: './ruleset/Dler/Crypto.list',
    target: '💰 Crypto & Bet',
  },
  {
    key: 'geekBet',
    url: 'https://raw.githubusercontent.com/geekhuashan/Proxy-Rules/refs/heads/main/Surge/Surge%203/Provider/Bet.list',
    path: './ruleset/GeekHuashan/Bet.list',
    target: '💰 Crypto & Bet',
  },
  {
    key: 'dlerDiscord',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Discord.list',
    path: './ruleset/Dler/Discord.list',
    target: '🚀 节点选择',
  },
  {
    key: 'dlerGoogleFCM',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Google%20FCM.list',
    path: './ruleset/Dler/Google-FCM.list',
    target: '📢 谷歌FCM',
  },
  {
    key: 'dlerMicrosoft',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Microsoft.list',
    path: './ruleset/Dler/Microsoft.list',
    target: 'Ⓜ️ 微软服务',
  },
  {
    key: 'dlerScholar',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Scholar.list',
    path: './ruleset/Dler/Scholar.list',
    target: '🚀 节点选择',
  },
  {
    key: 'dlerSpeedtest',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Speedtest.list',
    path: './ruleset/Dler/Speedtest.list',
    target: '🚀 节点选择',
  },
  {
    key: 'dlerSteam',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Steam.list',
    path: './ruleset/Dler/Steam.list',
    target: '🎮 游戏平台',
  },
  {
    key: 'dlerProxy',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Proxy.list',
    path: './ruleset/Dler/Proxy.list',
    target: '🚀 节点选择',
  },
]

const domesticRuleSets = [
  {
    key: 'dlerDomestic',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Domestic.list',
    path: './ruleset/Dler/Domestic.list',
    target: '🎯 全球直连',
  },
  {
    key: 'dlerDomesticIPs',
    url: 'https://testingcf.jsdelivr.net/gh/dler-io/Rules@main/Surge/Surge%203/Provider/Domestic%20IPs.list',
    path: './ruleset/Dler/Domestic-IPs.list',
    target: '🎯 全球直连',
  },
]

domesticMediaRuleSets.forEach((item) => {
  remoteRuleSets.push({ ...item, target: '🌏 国内媒体' })
})

globalMediaRuleSets.forEach((item) => {
  remoteRuleSets.push({ ...item, target: '🌍 国外媒体' })
})

appleRuleSets.forEach((item) => {
  remoteRuleSets.push({ ...item, target: '🍎 苹果服务' })
})

generalServiceRuleSets.forEach((item) => {
  remoteRuleSets.push(item)
})

domesticRuleSets.forEach((item) => {
  remoteRuleSets.push(item)
})

const hostOverrides = {
  'ip6-localhost': '::1',
  'ip6-loopback': '::1',
  'taobao.com': '223.6.6.6',
  '*.taobao.com': '223.6.6.6',
  'tmall.com': '223.6.6.6',
  '*.tmall.com': '223.6.6.6',
  'jd.com': '119.29.29.29',
  '*.jd.com': '119.28.28.28',
  '*.qq.com': '119.28.28.28',
  '*.tencent.com': '119.28.28.28',
  '*.alicdn.com': '223.5.5.5',
  'aliyun.com': '223.5.5.5',
  '*.aliyun.com': '223.5.5.5',
  'weixin.com': '119.28.28.28',
  '*.weixin.com': '119.28.28.28',
  'bilibili.com': '119.29.29.29',
  '*.bilibili.com': '119.29.29.29',
  '*.hdslb.com': '119.29.29.29',
  '163.com': '119.29.29.29',
  '*.163.com': '119.29.29.29',
  '126.com': '119.29.29.29',
  '*.126.com': '119.29.29.29',
  '*.126.net': '119.29.29.29',
  '*.127.net': '119.29.29.29',
  '*.netease.com': '119.29.29.29',
  'mi.com': '119.29.29.29',
  '*.mi.com': '119.29.29.29',
  'xiaomi.com': '119.29.29.29',
  '*.xiaomi.com': '119.29.29.29',
  // Surge 写法使用 server:syslib 指向系统解析，Clash 不支持，直接省略保持系统默认
}

// 程序入口
function main(config) {
  const proxies = Array.isArray(config?.proxies) ? config.proxies : []
  const proxyProviders =
    typeof config?.['proxy-providers'] === 'object' ? config['proxy-providers'] : {}
  const proxyProviderNames = Object.keys(proxyProviders)
  const proxyCount = proxies.length

  if (proxyCount === 0 && proxyProviderNames.length === 0) {
    throw new Error('配置文件中未找到任何代理')
  }

  config['allow-lan'] = true
  config['bind-address'] = '*'
  config['mode'] = 'rule'

  // 覆盖原配置中DNS配置
  config['dns'] = dnsConfig

  config['profile'] = {
    'store-selected': true,
    'store-fake-ip': true,
  }

  config['unified-delay'] = true
  config['tcp-concurrent'] = true

  /**
   * 这个值设置大点能省电，笔记本和手机需要关注一下
   */
  config['keep-alive-interval'] = 1800

  config['find-process-mode'] = 'strict'

  config['geodata-mode'] = true

  /**
   * 适合小内存环境，如果在旁路由里运行可以改成standard
   */
  config['geodata-loader'] = 'memconservative'

  config['geo-auto-update'] = true

  config['geo-update-interval'] = 24

  /**
   * 不开域名嗅探的话，日志里只会记录请求的ip，对查找问题不方便
   * override-destination默认值是true，但是个人建议全局设为false，否则某些应用会出现莫名其妙的问题
   * Mijia Cloud跳过是网上抄的
   */
  config['sniffer'] = {
    enable: true,
    'force-dns-mapping': true,
    'parse-pure-ip': true,
    'override-destination': false,
    sniff: {
      TLS: {
        ports: [443, 8443],
      },
      HTTP: {
        ports: [80, '8080-8880'],
      },
      QUIC: {
        ports: [443, 8443],
      },
    },
    'force-domain': [],
    'skip-domain': ['Mijia Cloud', '+.oray.com'],
  }

  /**
   * write-to-system如果设为true的话，有可能出现电脑时间不对的问题
   */
  config['ntp'] = {
    enable: true,
    'write-to-system': false,
    server: 'cn.ntp.org.cn',
  }

  config['geox-url'] = {
    geoip:
      'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat',
    geosite:
      'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat',
    mmdb: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb',
    asn: 'https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/GeoLite2-ASN.mmdb',
  }

  config['hosts'] = {
    ...(config.hosts || {}),
    ...hostOverrides,
  }

  if (!enable) {
    return config
  }

  const proxyNames = proxies.map((proxy) => proxy.name)
  let remainingProxyNames = [...proxyNames]
  const regionProxyGroups = []

  const latencyTestRegions = new Set(['🇭🇰 香港节点', '🇨🇳 台湾节点', '🇯🇵 日本节点', '🇸🇬 狮城节点'])

  regionOptions.regions.forEach((region) => {
    const matched = proxies
      .filter((proxy) => {
        const multiplier =
          /(?<=[xX✕✖⨉倍率])([1-9]+(\.\d+)*|0{1}\.\d+)(?=[xX✕✖⨉倍率])*/i.exec(proxy.name)?.[1]
        return (
          proxy.name.match(region.regex) && parseFloat(multiplier || '0') <= region.ratioLimit
        )
      })
      .map((proxy) => proxy.name)

    if (matched.length > 0) {
      const group = {
        ...groupBaseOption,
        name: region.name,
        type: latencyTestRegions.has(region.name) ? 'url-test' : 'select',
        tolerance: 150,
        icon: region.icon,
        proxies: matched,
      }
      if (!latencyTestRegions.has(region.name)) {
        delete group.tolerance
      }
      regionProxyGroups.push(group)
      remainingProxyNames = remainingProxyNames.filter((name) => !matched.includes(name))
    }
  })

  const regionGroupNames = regionProxyGroups.map((group) => group.name)
  const hasISPGroup = regionGroupNames.includes('📶 ISP节点')
  const otherGroupName = remainingProxyNames.length > 0 ? '🌐 其他节点' : null

  const ensureExists = (candidates) =>
    candidates.filter((name) => regionGroupNames.includes(name))

  const prioritizedRegions = ensureExists([
    '🇭🇰 香港节点',
    '🇨🇳 台湾节点',
    '🇸🇬 狮城节点',
    '🇯🇵 日本节点',
    '🇺🇲 美国节点',
    '🇰🇷 韩国节点',
  ])
  const domesticRegions = ensureExists([
    '🇭🇰 香港节点',
    '🇨🇳 台湾节点',
    '🇸🇬 狮城节点',
    '🇯🇵 日本节点',
  ])
  const openAiRegions = ensureExists([
    '🇸🇬 狮城节点',
    '🇭🇰 香港节点',
    '🇨🇳 台湾节点',
    '🇯🇵 日本节点',
    '🇺🇲 美国节点',
    '🇰🇷 韩国节点',
  ])
  const usFirstRegions = ensureExists([
    '🇺🇲 美国节点',
    '🇭🇰 香港节点',
    '🇨🇳 台湾节点',
    '🇸🇬 狮城节点',
    '🇯🇵 日本节点',
    '🇰🇷 韩国节点',
  ])

  const tailWithManual = [
    ...(otherGroupName ? [otherGroupName] : []),
    '🚀 手动切换',
    ...(hasISPGroup ? ['📶 ISP节点'] : []),
  ]
  const manualProxies = proxyNames.length > 0 ? proxyNames : ['DIRECT']

  config['proxy-groups'] = [
    {
      ...groupBaseOption,
      name: '🚀 手动切换',
      type: 'select',
      use: proxyProviderNames,
      proxies: manualProxies,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Rocket.png',
    },
    {
      ...groupBaseOption,
      name: '♻️ 自动选择',
      type: 'url-test',
      use: proxyProviderNames,
      proxies: manualProxies,
      tolerance: 50,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Auto.png',
    },
    {
      ...groupBaseOption,
      name: '🚀 节点选择',
      type: 'select',
      proxies: ['♻️ 自动选择', ...prioritizedRegions, ...tailWithManual, 'DIRECT'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Proxy.png',
    },
    {
      ...groupBaseOption,
      name: '👨‍🎓 huashan',
      type: 'select',
      proxies: [
        ...(hasISPGroup ? ['📶 ISP节点'] : []),
        ...(regionGroupNames.includes('🇺🇲 美国节点') ? ['🇺🇲 美国节点'] : []),
        'DIRECT',
      ],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Filter.png',
    },
    {
      ...groupBaseOption,
      name: '📹 油管视频',
      type: 'select',
      proxies: ['🚀 节点选择', '♻️ 自动选择', ...prioritizedRegions, ...tailWithManual, 'DIRECT'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/YouTube.png',
    },
    {
      ...groupBaseOption,
      name: '🎥 奈飞视频',
      type: 'select',
      proxies: ['🚀 节点选择', '♻️ 自动选择', ...prioritizedRegions, ...tailWithManual, 'DIRECT'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Netflix.png',
    },
    {
      ...groupBaseOption,
      name: '🌍 国外媒体',
      type: 'select',
      proxies: ['🚀 节点选择', '♻️ 自动选择', ...prioritizedRegions, ...tailWithManual, 'DIRECT'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Streaming.png',
    },
    {
      ...groupBaseOption,
      name: '🌏 国内媒体',
      type: 'select',
      proxies: ['DIRECT', ...domesticRegions, ...tailWithManual],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/StreamingCN.png',
    },
    {
      ...groupBaseOption,
      name: '💬 OpenAi',
      type: 'select',
      proxies: ['🚀 节点选择', '♻️ 自动选择', ...openAiRegions, ...tailWithManual, 'DIRECT'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/ChatGPT.png',
    },
    {
      ...groupBaseOption,
      name: '📢 谷歌FCM',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择', ...usFirstRegions, ...tailWithManual],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Google.png',
    },
    {
      ...groupBaseOption,
      name: 'Ⓜ️ 微软服务',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择', ...usFirstRegions, ...tailWithManual],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Microsoft.png',
    },
    {
      ...groupBaseOption,
      name: '🍎 苹果服务',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择', ...usFirstRegions, ...tailWithManual],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Apple_2.png',
    },
    {
      ...groupBaseOption,
      name: '🎮 游戏平台',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择', ...usFirstRegions, ...tailWithManual],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Game.png',
    },
    {
      ...groupBaseOption,
      name: '💰 Crypto & Bet',
      type: 'select',
      proxies: ['🚀 节点选择', '♻️ 自动选择', ...openAiRegions, ...tailWithManual, 'DIRECT'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Bet.png',
    },
    {
      ...groupBaseOption,
      name: '📞 talkatone',
      type: 'select',
      proxies: ['🚀 节点选择', '♻️ 自动选择', ...usFirstRegions, ...tailWithManual, 'DIRECT'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Phone.png',
    },
    {
      ...groupBaseOption,
      name: '🔍 谷歌搜索',
      type: 'select',
      proxies: ['🚀 节点选择', '♻️ 自动选择', ...usFirstRegions, ...tailWithManual, 'DIRECT'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Google_Search.png',
    },
    {
      ...groupBaseOption,
      name: '🎯 全球直连',
      type: 'select',
      proxies: ['DIRECT', '🚀 节点选择', '♻️ 自动选择'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Direct.png',
    },
    {
      ...groupBaseOption,
      name: '🛑 广告拦截',
      type: 'select',
      proxies: ['REJECT', 'DIRECT'],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Advertising.png',
    },
    {
      ...groupBaseOption,
      name: '🐟 漏网之鱼',
      type: 'select',
      proxies: ['🚀 节点选择', '♻️ 自动选择', 'DIRECT', ...prioritizedRegions, ...tailWithManual],
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/Final.png',
    },
  ]

  if (otherGroupName) {
    config['proxy-groups'].push({
      ...groupBaseOption,
      name: otherGroupName,
      type: 'select',
      proxies: remainingProxyNames,
      icon: 'https://fastly.jsdelivr.net/gh/Koolson/Qure/IconSet/Color/World_Map.png',
    })
  }

  config['proxy-groups'] = config['proxy-groups'].concat(regionProxyGroups)

  const ruleProviders = new Map()
  const rules = [
    'DOMAIN-SUFFIX,tailscale.com,DIRECT',
    'DOMAIN-SUFFIX,tailscale.io,DIRECT',
    'DOMAIN-SUFFIX,ipn.dev,DIRECT',
    'DOMAIN-SUFFIX,local,DIRECT',
    'IP-CIDR6,fd7a:115c:a1e0::/48,DIRECT,no-resolve',
    'IP-CIDR,127.0.0.1/32,DIRECT,no-resolve',
    'IP-CIDR,192.168.71.100/32,DIRECT,no-resolve',
    'IP-CIDR,192.168.71.0/24,DIRECT,no-resolve',
    'IP-CIDR,10.0.0.0/8,DIRECT,no-resolve',
    'IP-CIDR,172.16.0.0/12,DIRECT,no-resolve',
    'IP-CIDR,192.168.0.0/16,DIRECT,no-resolve',
    'IP-CIDR,192.168.122.1/32,DIRECT,no-resolve',
    'IP-CIDR,193.168.0.1/32,DIRECT,no-resolve',
    'IP-CIDR,100.64.0.0/10,DIRECT,no-resolve',
  ]

  remoteRuleSets.forEach(({ key, url, path, target }) => {
    ruleProviders.set(key, {
      ...ruleProviderCommon,
      behavior: 'classical',
      format: 'text',
      url,
      path,
    })
    rules.push(`RULE-SET,${key},${target}`)
  })

  rules.push('GEOIP,LAN,DIRECT')
  rules.push('GEOIP,CN,🎯 全球直连')
  rules.push('MATCH,🐟 漏网之鱼')

  config['rules'] = rules
  config['rule-providers'] = Object.fromEntries(ruleProviders)

  return config
}
