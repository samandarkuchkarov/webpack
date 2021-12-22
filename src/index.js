import axios from "axios";
import './style.css'
const prizes = [
    {
      text: "Бесплатный интернет на год",
      color: "#fff",
      font: "#E5474C",
    },
    { 
      text: "Бесплатный интернет на пол года",
      color: "#E5474C",
      font: "#fff",
    },
    { 
      text: "Бесплатный интернет на 3 месяца",
      color: "#fff",
      font: "#E5474C",
    },
    {
      text: "500 000",
      color: "#E5474C",
      font: "#fff",
    },
    {
      text: "380 000",
      color: "#fff",
      font: "#E5474C",
    },
    {
      text: "100 000",
      color: "#E5474C",
      font: "#fff",
    },
    {
      text: "50 000",
      color: "#fff",
      font: "#E5474C",
    },
    {
      text: "20 000",
      color: "#E5474C",
      font: "#fff",
    },
    {
      text: "Роутер",
      color: "#fff",
      font: "#E5474C",
    },
    {
      text: "Amediateka",
      color: "#E5474C",
      font: "#fff",
      
    },
    
];
  
  // создаём переменные для быстрого доступа ко всем объектам на странице — блоку в целом, колесу, кнопке и язычку
  const wheel = document.querySelector(".deal-wheel");
  const spinner = wheel.querySelector(".spinner");
  const trigger = wheel.querySelector(".btn-spin");
  const ticker = wheel.querySelector(".ticker");
  
  // на сколько секторов нарезаем круг
  const prizeSlice = 360 / prizes.length;
  // на какое расстояние смещаем сектора друг относительно друга
  const prizeOffset = Math.floor(180 / prizes.length);
  // прописываем CSS-классы, которые будем добавлять и убирать из стилей
  const spinClass = "is-spinning";
  const selectedClass = "selected";
  // получаем все значения параметров стилей у секторов
  const spinnerStyles = window.getComputedStyle(spinner);
  
  // переменная для анимации
  let tickerAnim;
  // угол вращения
  let rotation = 0;
  // текущий сектор
  let currentSlice = 0;
  // переменная для текстовых подписей
  let prizeNodes;
  
  // расставляем текст по секторам
  const createPrizeNodes = () => {
    // обрабатываем каждую подпись
    prizes.forEach(({ text, font, reaction }, i) => {
      // каждой из них назначаем свой угол поворота
      const rotation = ((prizeSlice * i) * -1) - prizeOffset;
      // добавляем код с размещением текста на страницу в конец блока spinner
      spinner.insertAdjacentHTML(
        "beforeend",
        // текст при этом уже оформлен нужными стилями
        `<li class="prize" data-reaction=${reaction} style="--rotate: ${rotation}deg">
          <span style="color: ${font}" class="text">${text}</span>
        </li>`
      );
    });
  };
  
  // рисуем разноцветные секторы
  const createConicGradient = () => {
    // устанавливаем нужное значение стиля у элемента spinner
    spinner.setAttribute(
      "style",
      `background: conic-gradient(
        from -90deg,
        ${prizes
          // получаем цвет текущего сектора
          .map(({ color }, i) => `${color} 0 ${(100 / prizes.length) * (prizes.length - i)}%`)
          .reverse()
        }
      );`
    );
  };
  
  // создаём функцию, которая нарисует колесо в сборе
  const setupWheel = () => {
    // сначала секторы
    createConicGradient();
    // потом текст
    createPrizeNodes();
    // а потом мы получим список всех призов на странице, чтобы работать с ними как с объектами
    prizeNodes = wheel.querySelectorAll(".prize");
  };
  
  // определяем количество оборотов, которое сделает наше колесо
  const spinertia = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  
  // функция запуска вращения с плавной остановкой
  const runTickerAnimation = () => {
    // взяли код анимации отсюда: https://css-tricks.com/get-value-of-css-rotation-through-javascript/
    const values = spinnerStyles.transform.split("(")[1].split(")")[0].split(",");
    const a = values[0];
    const b = values[1];  
    let rad = Math.atan2(b, a);
    
    if (rad < 0) rad += (2 * Math.PI);
    
    const angle = Math.round(rad * (180 / Math.PI));
    const slice = Math.floor(angle / prizeSlice);
  
    // анимация язычка, когда его задевает колесо при вращении
    // если появился новый сектор
    if (currentSlice !== slice) {
      // убираем анимацию язычка
      ticker.style.animation = "none";
      // и через 10 миллисекунд отменяем это, чтобы он вернулся в первоначальное положение
      setTimeout(() => ticker.style.animation = null, 20);
      // после того, как язычок прошёл сектор - делаем его текущим 
      currentSlice = slice;
    }
    // запускаем анимацию
    tickerAnim = requestAnimationFrame(runTickerAnimation);
  };
  
  const prizeChose = (name) =>{
    if(name==='Бесплатный интернет на год'){
        return  Math.floor(360*6+20)
    }else if(name==='Amediateka'){
        return  Math.floor(360*6+347)
    }else if(name==='Роутер'){
        return  Math.floor(360*6+307)
    }else if(name==='20 000'){
        return  Math.floor(360*6+270)
    }else if(name==='50 000'){
        return  Math.floor(360*6+230)
    }else if(name==='100 000'){
        return  Math.floor(360*6+200)
    }else if(name==='380 000'){
        return  Math.floor(360*6+160)
    }else if(name==='500 000'){
        return  Math.floor(360*6+130)
    }else if(name==='Бесплатный интернет на 3 месяца'){
        return  Math.floor(360*6+90)
    }else if(name==='Бесплатный интернет на пол года'){
        return  Math.floor(360*6+60)
    }
    
  }
  const selectPrize = () => {
    const selected = Math.floor(rotation / prizeSlice);
    prizeNodes[selected].classList.add(selectedClass);
  };
  
  // отслеживаем нажатие на кнопку
  trigger.addEventListener("click", () => {
    


    trigger.disabled = true;
    rotation = prizeChose(prizes[9].text);




    prizeNodes.forEach((prize) => prize.classList.remove(selectedClass));
    // добавляем колесу класс is-spinning, с помощью которого реализуем нужную отрисовку
    wheel.classList.add(spinClass);
    // через CSS говорим секторам, как им повернуться
    spinner.style.setProperty("--rotate", rotation);
    // возвращаем язычок в горизонтальную позицию
    ticker.style.animation = "none";
    // запускаем анимацию вращение
    runTickerAnimation();
  });
  
  // отслеживаем, когда закончилась анимация вращения колеса
  spinner.addEventListener("transitionend", () => {
    // останавливаем отрисовку вращения
    cancelAnimationFrame(tickerAnim);
    // получаем текущее значение поворота колеса
    rotation %= 360;
    // выбираем приз
    selectPrize();
    // убираем класс, который отвечает за вращение
    wheel.classList.remove(spinClass);
    // отправляем в CSS новое положение поворота колеса
    spinner.style.setProperty("--rotate", rotation);
    // делаем кнопку снова активной
    trigger.disabled = false;
  });
  
  // подготавливаем всё к первому запуску
  setupWheel();

 let btnSub =  document.querySelector('.submit')

 btnSub.addEventListener('click',()=>{
   const textareas = document.querySelectorAll('input')
   if(textareas[0].value&&textareas[1].value){
    document.querySelector('.form').style.display = 'none'
    document.querySelector('.deal-wheel').style.display = 'grid'
    document.querySelector('body').classList.add('back2')
   }else{
    console.log(2)
   }
   
 })