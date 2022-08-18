let musics = ['王铮亮 - 时间都去哪儿了',
	'醒来-薛之谦',
	'未知歌手-情意结',
	'陈柏宇 - 你瞒我瞒',
	'麦浚龙-谢安琪 - 罗生门',
	'黄宗泽 - 最后祝福'
]
let mvimg = [
	'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimages.rednet.cn%2Farticleimage%2F2015%2F03%2F31%2F1134174470.jpg&refer=http%3A%2F%2Fimages.rednet.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661509831&t=44bfb1f800a7a2b73991cc1833ca5b0f',

	'https://gimg2.baidu.com/image_search/src=http%3A%2F%2F5b0988e595225.cdn.sohucs.com%2Fimages%2F20180924%2F4cca373b985d4593b7989ac22261ac67.jpeg&refer=http%3A%2F%2F5b0988e595225.cdn.sohucs.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661509912&t=88b960aaf9bed79af1dbed491cde00c6',

	'https://pics2.baidu.com/feed/ac345982b2b7d0a2c68c591bb5d8b6004a369ab4.jpeg?token=34a75f85bd791b341c4eaf4c66028eee',

	'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fwww.lztai.com%2FupFiles%2FinfoImg%2Fcoll%2F202012%2FOT20201212131020101.jpg&refer=http%3A%2F%2Fwww.lztai.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661511877&t=6166c1de46bd4739ff223319bf2cf3db',

	'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Flifestyle.etnet.com.hk%2Fcolumn%2Fimages%2Fstories%2F123%2F2015%2F07%2Ft20150724_b.png&refer=http%3A%2F%2Flifestyle.etnet.com.hk&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661510069&t=2f88ff5d121a4865745f92930e63b071',

	'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcdn-mm.pop365.com%2Fupload%2FXingshuImage%2F226%2Fb510cb4921d9b6551f5b001a0f142638.jpg&refer=http%3A%2F%2Fcdn-mm.pop365.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1661511704&t=65fae4e109cbf7df705ab3b6b739bdd3'
]
let musicHight = 0;
let audio = $('audio')
let audioSrc = 0;
let totelTime = 0;
let c = $('.timejd').offsetWidth; //进度条长度
let timer;
let musicsAll = 0; //歌曲下标


//播放进度条
function getTime() {
	totelTime = audio.duration; //音乐总时间
	let a = audio.currentTime; //当前音乐运动时间
	let bl = a / totelTime //计算比例音乐当前时间/总时间
	// 比例×长度就等于没秒多少长度
	let cd = bl * c
	pTime(a)
	$('#jd').style.width = cd + 'px'
	if (totelTime == a) {
		clearInterval(timer)
		musicsAll++;
		if (musicsAll > musics.length - 1) {
			musicsAll = 0
		}
		musicsPlay()
	}
}

//点击进度条--------------------------------------
$('.timejd').onmousemove = function (e) {
	let u = $('.timejd').getBoundingClientRect().left //进度条离左边距离
	let x = e.clientX - u
	if (x < 0) {
		x = 0
	}
	if (x > c) {
		x = c
	}
	let aa = parseInt((x / c) * audio.duration)
	if (aa < 60) {
		if (aa < 10) {
			$('#hovertime').innerText = '00:0' + aa
		} else {
			$('#hovertime').innerText = '00:' + aa
		}
	} else {
		if ((aa - (parseInt(aa / 60) * 60)) < 10) {
			$('#hovertime').innerText = "0" + parseInt(aa / 60) + ":" + "0" + (aa - (parseInt(aa / 60) * 60))
		} else {
			$('#hovertime').innerText = "0" + parseInt(aa / 60) + ":" + (aa - (parseInt(aa / 60) * 60))
		}


	}


	$('.timejd p').style.width = x + 'px'
	$('#hovertime').style.left = (x - ($('#hovertime').offsetWidth / 2)) + 'px'
	$('#hovertime').style.display = 'block';
	$('.timejd').onmousedown = function (e) {
		if (x < 0) {
			x = 0
		}
		if (x > c) {
			x = c
		}
		$('#jd').style.width = x + 'px'

		let tt = audio.duration; //音乐总时间
		// 当前拖动距离/进度条长度*音乐总长度=当前音乐时间
		cc = (x / c) * tt;
		audio.currentTime = cc;
	}
	document.onmouseover = function () { //鼠标抬起清空事件
		this.onmousedown = null
		$('.timejd p').style.width = '0px'
		$('#hovertime').style.display = 'none';
	}
}
//拖动进度条------------------------------
$('#jd div').onmousedown = function (e) {
	document.onmousemove = function (e) {
		let u = $('.timejd').getBoundingClientRect().left //进度条离左边距离
		let x = e.clientX - u
		if (x < 0) {
			x = 0
		}
		if (x > c) {
			x = c
		}
		$('#jd').style.width = x + 'px'
		let tt = audio.duration; //音乐总时间
		// 当前拖动距离/进度条长度*音乐总长度=当前音乐时间
		cc = (x / c) * tt;
		audio.currentTime = cc
	}
	document.onmouseup = function () { //鼠标抬起清空事件
		this.onmousedown = null
		this.onmousemove = null
	}
}

//时间
function pTime(a) {
	let aa = Math.trunc(a)
	let p = Math.trunc(totelTime / 60)
	let ppp = Math.trunc(totelTime - (p * 60))
	let time1 = $('.time1')
	let time2 = $('.time2')
	let min = 60
	let t, s;
	if (aa < 60) {
		if (aa < 10) {
			time1.innerText = '00:0' + aa
		} else {
			time1.innerText = '00:' + aa
		}
	} else {
		if ((Math.trunc(a) - Math.trunc(aa / 60) * 60) < 10) {
			time1.innerText = "0" + Math.trunc(aa / 60) + ':0' + (Math.trunc(a) - Math.trunc(aa / 60) * 60)
		} else {
			time1.innerText = "0" + Math.trunc(aa / 60) + ':' + (Math.trunc(a) - Math.trunc(aa / 60) * 60)
		}

	}
	p < 10 ? t = '0' + p : t = p
	ppp < 10 ? s = '0' + ppp : s = ppp
	time2.innerText = t + ':' + s
}



// 切换音乐函数
function musicsPlay() {
	init()
	audio.play()
	timer = setInterval(getTime, 1000)
	cc = 0
	noOff = false
	audio.currentTime = cc
	$('.time1').innerText = '00:00'
	$('.time2').innerText = '00:00'
	$('.but span', 1).className = 'fa fa-pause'
	$('.top').className = "top topb"
	setTimeout(function () {
		$('.top').className = "top topr"
	}, 400)
	buttext()


}
// 下一首
$('.but span', 2).onclick = function () {
	musicsAll++;
	if (musicsAll > musics.length - 1) {
		musicsAll = 0
	}
	$('.head img').className = 'fa-spin'
	musicsPlay()

}
// 播放按钮
let noOff = true
$('.but span', 1).onclick = function () {

	if (noOff) {
		noOff = !noOff
		setTimeout(function () {
			audio.play()
		}, 400)

		this.className = 'fa fa-pause'
		$('.head img').className = 'fa-spin'
		$('.top').className = "top topr"
		timer = setInterval(getTime, 1000)

	} else {
		noOff = !noOff
		audio.pause()
		this.className = 'fa fa-play'
		clearInterval(timer)
		$('.head img').className = ''
		$('.top').className = "top topb"
	}
	buttext()
}


//上一首
$('.but span', 0).onclick = function () {
	musicsAll--;
	if (musicsAll < 0) {
		musicsAll = musics.length - 1
	}
	$('.head img').className = 'fa-spin'
	musicsPlay()
}



function init() {
	audio.src = 'mp3/' + musics[musicsAll] + '.mp3' //音乐
	$('.text').innerText = musics[musicsAll] //作者
	$('.gc').innerText = musics[musicsAll].split('-')[0]
	$('body').style.backgroundImage = 'url(' + mvimg[musicsAll] + ')'
	$('.head img').src = mvimg[musicsAll]
	buttext()

}
init()


function buttext() {
	$('.div1').innerText = musics[musicsAll] //作者
	$('.div2').innerText = musics[musicsAll] //作者
	if (!noOff) {
		$('.div1').innerText = '' //作者
		$('.div2').innerText = '' //作者
	}

}
