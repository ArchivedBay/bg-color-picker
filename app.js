let hexColor = document.getElementById('colorChoice'),   // the colour-picker input
    button = document.getElementById('sendInputButton'), // the 'change background' button
    slider = document.getElementById('shadeSlider');     // the slider input


/* IMPORTANT NOTE:

    Because the slider updates faster than the screen, there is a transition effect applied to the body in CSS. 
    without this style effect, the slider will WORK but will generate strange effects, I am currently unsure what is causing it, but the transition
    effect removes this.
*/

let color = {
    r:255, //default rgba and lum values
    g:255,
    b:255,
    a:1,
    luminosity: 255,
    updateSelf: function(r,g,b,a=1){ //update the object with new values
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    },
    updateScreen: function(){ //update the DOM
        let rgba = `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
        document.getElementsByTagName('body')[0].style.backgroundColor = rgba;
    },
    updateLuminosity: function(){ //update the luminosity based on current rgb values.
        this.l = (0.2126 * this.r) + (0.7152 * this.g) + (0.0722 * this.b);
        document.getElementsByTagName('body')[0].style.color = this.l <= 90 ? '#fff' : '#000'; //update the text so it contrasts with the current background-color
    }
}




/* HEX CONVERSION */
hexConverter = (hexColor) => {                     //'408080'
    let r = parseInt(hexColor.substring(0,2), 16); //64
    let g = parseInt(hexColor.substring(2,4), 16); //128
    let b = parseInt(hexColor.substring(4,6), 16); //128

    updateObject(r,g,b) //update the color object with the new rgb values
}
updateObject = (r,g,b) => {
    color.updateSelf(r,g,b);  //update the rgb props
    color.updateLuminosity(); //update the Luminosity prop
    color.updateScreen();     //update the screen
}


/* INTERACTION COMPONENTS */
button.addEventListener('click', () => hexConverter(hexColor.value.slice(1) ));

slider.oninput = () => {
    document.getElementById('sliderValue').textContent = `Slider value: ${slider.value}`;

    if(slider.value > color.l){
        updateObject(color.r+64, color.g+64, color.b+64);
    } else if(slider.value < color.l){
        updateObject(color.r-64, color.g-64, color.b-64);
    }
}

