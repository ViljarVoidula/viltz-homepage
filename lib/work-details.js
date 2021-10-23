export const projects = {
    gamestreams: {
        title: 'Gamestreams',
        shortDescription: '',
        description: 'Me and my friend had a problem that we were unable to watch E-Sport events from big screens, so we decided to solve it. We developed and published a GameStreams app for LG store, during App lifecycle we had average over 10k downloads monthly, while maintaining in TOP 3 rated application in all regions. After Twitch successfuly launched official application we decided to close down our app. ',
        thumbnail: '',
        startYear: '2016',
        endYear: '2019',
        technologies: ['React', 'Redux', 'WebOS', 'Redis', 'Express'],
        platforms: ['Web', 'WebOS'],
        sampleImages: ['/images/work/projects/main_menu.jpg', '/images/work/projects/secondary_screen.png','/images/work/projects/GBSTORE.png' ]
    },
    westbygg: {
        title: 'Westbygg',
        shortDescription: '',
        description: 'Westbygg is a small company based in central Estonia. They produce exlusive handmade log cabins for their customers. They value nature highly and have continued to build log cabins for their customers using traditional manual crafting methods therefore saving energy and nature.',
        thumbnail: '',
        startYear: '2021',
        endYear: null,
        technologies: ['React', 'Next.js', 'Feathers.js', 'MongoDB'],
        platforms: ['Web'],
        sampleImages: ['/images/work/projects/westbygg_house.png', '/images/work/projects/westbygg_products.png']
    },
    minutv: {
        title: 'Telia MinuTV',
        shortDescription: 'Telia Estonia mobile OTT app',
        description: 'MinuTV was first experient of Telia Estonia to deliver TV content to both web and mobile devices using HLS streaming technology. I perfomed QA duties at that project implementing automated tests using Nightwatch.js on top of Selenium. MinuTV had around 50k subscribers at the time, few years laters UI and product was overhauled to single service which is used to date.',
        thumbnail: '',
        startYear: '2014',
        endYear: '2016',
        technologies: ['React', 'JQuery', 'Nightwatch', 'Appium'],
        platforms: ['iOS', 'Android', 'Web'],
        sampleImages: ['/images/work/projects/paisepilt_naine_1920.jpg'],
        links:[
            {
                url:'https://www.am.ee/en/node/2244',
                text: 'Elion tegi MinuTV rakenduse iPhone´ile'
            }
        ]
    },
    teliatv: {
        title: 'Telia Connected TV',
        shortDescription: 'Telia TV app for Samsung SmartTV platform',
        description: 'In 2012 I joined Telia Estonia (Elion) TV development team as Quality Assurance engineer. I started working on Samsung SmartTV solution which was granted Innovation reward in TV category 2012 IFA expo based in Berlin . I continued to work on the project later as QA and technical consultant under my own company for several years.',
        thumbnail: '',
        startYear: '2012',
        endYear: '2015',
        technologies: ['JQuery','HLS', 'IGMP', 'RTSP'],
        platforms: ['Samsung SmartTV', 'Tizen'],
        sampleImages: ['/images/work/projects/tv_pakett_hero.png', '/images/work/projects/tv_pakett_filmid_ja_sarjad.png'],
        links:[
            {
                url:'https://forte.delfi.ee/artikkel/65370010/elion-ja-samsung-toid-maailmas-esimesena-turule-digiboksivaba-tv-teenuse-smart-tv-des',
                text: 'Elion ja Samsung tõid maailmas esimesena turule digiboksivaba TV-teenuse Smart TV-des'
            }
        ]
    },
    simote: {
        title: 'Simote',
        shortDescription: 'Simote IR blaster TV testing automation platform`',
        description: 'Simote was developed to replace manual labor from TV testing. TV hardware is controlled with IR via remote and testing it manually was very time consuming, so Simote was born in Tartu in company called Stagnationlab. Simote allowed user to record user behavior and playback actions on multiple TV or set-top box manufacturer hardware. My role was to analyze requirements , help with acceptance testing and train fellow colleagues.',
        thumbnail: '',
        startYear: '2013',
        endYear: '2014',
        technologies: ['JQuery', 'Bootstrap', 'Teensy', 'Express'],
        platforms: ['Web', 'Various TV manufacturers'],
        sampleImages: ['/images/work/Simote.png']
    }
}