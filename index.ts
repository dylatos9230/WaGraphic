interface CraphicClient {
    new():any;
    update(time:number,height:number,width:number,):any;
    render():any;
}

type WasmPromiseModule = {
    Client: CraphicClient
}



const wasmWrapper = import("./pkg/")

// Step one: initialize the canvas
const webGLCanvas:HTMLCanvasElement = document.createElement("canvas");
webGLCanvas.id = 'rustCanvas'
webGLCanvas.width = window.innerWidth
webGLCanvas.height = window.innerHeight
const bodyEle:HTMLElement = document.querySelector('body')
bodyEle.appendChild(webGLCanvas)

const glInstance = webGLCanvas.getContext('webgl', { antialias: true})
wasmWrapper.then(res=>{
    if(!glInstance) {
        console.error('Failed to initialize WebGL')
        return
    }
    // The type assertion aims at passing the type-checking.
    const wasmModule = res as unknown as WasmPromiseModule;
    const clientInstance= new wasmModule.Client()
    
    
    const FPS_THROTTLE = 1000.0 / 30.0 // Duration / frames
    const initialTime = Date.now()// In ms
    let lastDrawTime = -1 // In milliseconds

    function render(){
        window.requestAnimationFrame(render)
        const currentTime = Date.now()
        
        if (currentTime >= lastDrawTime + FPS_THROTTLE) {
            lastDrawTime = currentTime

            if(window.innerHeight != webGLCanvas.height || window.innerWidth != webGLCanvas.width){
                webGLCanvas.height = window.innerHeight
                
                webGLCanvas.width = window.innerWidth

                glInstance.viewport(0,0, window.innerWidth,window.innerHeight)

            }
            let elapsedTime = currentTime - initialTime
            clientInstance.update(elapsedTime, window.innerHeight, window.innerWidth)
            
            clientInstance.render()
            
        }
    }

    render()
    
})





