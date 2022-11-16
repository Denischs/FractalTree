const canvas = document.querySelector('canvas');
const generateButton = document.querySelector('.generate-tree');
const autoChange = document.querySelector('.auto-change');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');
let curve = 10;
let curve2;
let flag= true;
let timer ;

function drawTree(startX, startY, len, angle, branchWidth, color1, color2) {
    ctx.beginPath();
    ctx.save();
    ctx.strokeStyle = color1;
    ctx.fillStyle = color2;
    ctx.shadowBlur = 10;
    ctx.shadowColor = 'rgba(255,255,255,.5)';   
    ctx.lineWidth = branchWidth;
    ctx.translate(startX, startY);
    ctx.rotate(angle * Math.PI/180);
    ctx.moveTo(0, 0);
    
    if(angle > 0){
        ctx.bezierCurveTo(curve2, -len/2, curve2, -len/2, 0, -len);
    } else{
        ctx.bezierCurveTo(curve2, -len/2, curve2, -len/2, 0, -len);
    }
    ctx.stroke();

    if(len<5) {
        ctx.beginPath();
        ctx.arc(0, -len, 10, 0, Math.PI/2);
        ctx.fill();
        ctx.restore();
        return;
    }

    

    drawTree(0, -len, len * 0.75, angle + curve,branchWidth * 0.6);
    drawTree(0, -len, len * 0.75, angle - curve ,branchWidth * 0.6 );

    ctx.restore();
}



function generateRandomTree() {
    ctx.clearRect(0,0,canvas.width, canvas.height);
    let centerPoint = canvas.width/2;
    let len = Math.floor((Math.random() * 10) + 100);
    let angle = 0;
    let branchWithd = (Math.random() * 70) +1;
    let color1 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
    let color2 = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ')';
    curve = (Math.random() * 20) + 10;
    curve2 = Math.random() * 50;
    
    generateButton.style.borderColor = color1;
    generateButton.style.color = color1;

    drawTree(centerPoint, canvas.height - 80, len, angle, branchWithd, color1, color2);  

  

}

generateButton.addEventListener('click', function (){
    clearInterval(timer);
    flag = true;
    generateRandomTree();  
});
autoChange.addEventListener('click', function () {
   
    if(flag == true) {
        timer = setInterval(generateRandomTree , 1000) ;
        flag = false;
    }
    else {
        flag = true;
        clearInterval(timer);
    }
   
});
