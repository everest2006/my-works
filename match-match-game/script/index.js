(function () {
    function Customgame() {
        this.masSkirts = [];
        this.cardTwin = [];
        this.skirts = null;
        this.difficulty = null;
        this.descriptionNode = null;
        this.timeout;
        this.time = {
            hours: 0,
            minutes:0,
            seconds:0
        }
    };

    Customgame.prototype.chooseSkirt = function (name) {
        this.skirts = name;
        document.getElementsByClassName('message-skirt')[0].textContent ="You chose skirt of "+name;
        let element = document.getElementsByClassName('field')[0];
        let descriptionElement = document.getElementsByClassName('description')[0];
        if(descriptionElement) {
            this.descriptionNode = descriptionElement.cloneNode(true);
        }
        if (element.children.length) {
            this.removeAllSkirts(element);
        }
        let x = -17;
        for (var i = 1; i < 13; i++) {
            let div = document.createElement('div');
            div.style.height = '120px';
            div.style.width = '100px';
            div.style.float = 'left';
            div.style.marginLeft = '30px';
            div.style.marginTop = '30px';
            div.style.backgroundImage = 'url("./img/' + this.skirts + '.png';
            div.style.backgroundRepeat = 'no-repeat';
            div.style.backgroundPosition = x + 'px 0px';
            div.style.backgroundSize = 'cover';
            element.append(div);
            x -= 96;
        }
    };

    Customgame.prototype.chooseDifficulty = function(val,name){
        this.difficulty = val;
        document.getElementsByClassName('message-difficulty')[0].textContent ="You chose skirt of "+name;
    };

    Customgame.prototype.showWin = function(){
        clearTimeout(this.timeout);
        document.getElementsByClassName('win')[0].style.display='block';
        document.getElementsByClassName('visible')[0].children[2].textContent = document.getElementsByClassName('time')[0].textContent;
    }

    Customgame.prototype.removeAllSkirts = function (element) {
        while (element.children.length) {
            element.removeChild(element.children[0]);
        }
    };

    Customgame.prototype.timer = function () {
            ++this.time.seconds;
            if (this.time.seconds == 60) {
                this.time.seconds = 0;
                ++this.time.minutes;
                if (this.time.minutes == 60) {
                    this.time.minutes = 0;
                    ++this.time.hours;
                }
            }
            let timeNow = 'Your time ';
            if(this.time.hours<10){
                timeNow+='0'+this.time.hours+':';
            }else{
                timeNow+=this.time.hours+':';
            }
            if(this.time.minutes<10){
                timeNow+='0'+this.time.minutes+':';
            }else{
                timeNow+=this.time.minutes+':';
            }
            if(this.time.seconds<10){
                timeNow+='0'+this.time.seconds;
            }else{
                timeNow+=this.time.seconds;
            }
            document.getElementsByClassName('time')[0].textContent = timeNow;
            this.timeout = setTimeout(this.timer.bind(this),1000);
    };

    Customgame.prototype.startGame = function () {
        clearTimeout(this.timeout);
        this.time.go = true;
        this.time.seconds = 0;
        this.time.minutes = 0;
        this.time.hours = 0;
        if (this.skirts && this.difficulty) {
            this.timer();
            let element = document.getElementsByClassName('field')[0];            
            if (element.children.length) {
                this.removeAllSkirts(element);
            }

            // создаем массив карт
            let x = -17;
            for (var i = 1; i < this.difficulty / 2 + 1; i++) {
                for (var j = 0; j < 2; j++) {
                    let divBack = document.createElement('div');
                    let divCard = document.createElement('div');
                    let divFront = document.createElement('div');
                    divBack.className = 'back';
                    divCard.className = 'card';
                    ((this.difficulty==24)&&(divCard.classList.add('hight')))||
                    ((this.difficulty==18)&&(divCard.classList.add('medium')))||
                    ((this.difficulty==10)&&(divCard.classList.add('low')));
                    divFront.className = 'front';
                    divBack.style.backgroundImage = 'url("./img/' + this.skirts + '.png';
                    divFront.style.backgroundImage = 'url("./img/' + this.skirts + '.png';
                    divFront.style.backgroundPosition = '-1180px 0px';
                    divBack.style.backgroundPosition = x + 'px 0px';
                    divCard.append(divBack);
                    divCard.append(divFront);
                    this.masSkirts.push(divCard);
                }
                x -= 96;
            }
            //Рандомное размещение
            var k = this.masSkirts.length;
            for (var i = 0; i < k; i++) {
                var p = Math.floor(Math.random() * (this.masSkirts.length));
                element.append(this.masSkirts[p]);
                this.masSkirts.splice(p, 1);
            }
            var context = this;
            var countCard = 0;
            // вешаем событие клик по карте
            element.onclick = function (event) {
                if ((event.currentTarget != event.target) &&
                        (context.cardTwin[0] != event.target.parentNode) &&
                            (context.cardTwin.length < 2) &&
                                (event.target.style.transform != 'scale(1)')) {
                    var elem = event.target;
                    if (context.cardTwin.length < 2) {
                        elem.parentNode.style.transform = 'rotateY(180deg)';
                        context.cardTwin.push(elem.parentNode);
                    }
                    if (context.cardTwin.length == 2) {
                        if (context.cardTwin[1].children[0].style.backgroundPosition != context.cardTwin[0].children[0].style.backgroundPosition) {
                            setTimeout(function () {
                                context.cardTwin[0].style.transform = 'rotateY(360deg)';
                                context.cardTwin[1].style.transform = 'rotateY(360deg)';
                                context.cardTwin = [];
                            }, 2000);
                        } else {
                            setTimeout(function () {
                                for (let i = 0; i < 2; i++) {
                                    context.cardTwin[i].removeChild(context.cardTwin[i].children[1]);
                                    context.cardTwin[i].style.transform = "scale(1)";
                                }
                                context.cardTwin = [];
                                countCard += 2;
                                if (countCard == context.difficulty) {
                                    context.showWin();
                                    context.time.seconds =0;
                                    context.time.minutes =0;
                                    context.time.hours =0;
                                }
                            }, 2000);
                        }
                    }
                }
            }
        }else{
            if(!this.skirts){document.getElementsByClassName('message-skirt')[0].textContent="You need choose skirt!!!"};
            if(!this.difficulty){document.getElementsByClassName('message-difficulty')[0].textContent="You need choose difficulty!!!"}
        }
    }

 let game = new Customgame();
    let skirtsList = document.getElementsByClassName('skirts-list')[0];
    skirtsList.children[0].onclick = game.chooseSkirt.bind(game,'pikachu');
    skirtsList.children[1].onclick = game.chooseSkirt.bind(game,'smiles');
    skirtsList.children[2].onclick = game.chooseSkirt.bind(game,'uefa');
    let difficultyList = document.getElementsByClassName('difficulty-list')[0];
    difficultyList.children[0].onclick = game.chooseDifficulty.bind(game, 10, "low");
    difficultyList.children[1].onclick = game.chooseDifficulty.bind(game, 18, "medium");
    difficultyList.children[2].onclick = game.chooseDifficulty.bind(game, 24, "high");
    
    console.log(skirtsList);
    let newElement = document.getElementsByClassName('new')[0];
    newElement.onclick = game.startGame.bind(game);
}());