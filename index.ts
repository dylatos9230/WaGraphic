interface CraphicClient {
    new():any;
}

type WasmPromiseModule = {
    Client: CraphicClient
}



const wasmWrapper = import("./pkg/")

// Step one: initialize the canvas
const webGLCanvas:HTMLCanvasElement = document.createElement("canvas");
const bodyEle:HTMLElement = document.querySelector('body')
// webGLCanvas.width = 500
// webGLCanvas.height = 500
bodyEle.appendChild(webGLCanvas)
const glInstance = webGLCanvas.getContext('webgl', { antialias: true})
wasmWrapper.then(res=>{
    // The type assertion aims at passing the type-checking.
    const wasmModule = res as unknown as WasmPromiseModule;
    const clientInstance= new wasmModule.Client()
    
    if(!glInstance) {
        console.error('Failed to initialize WebGL')
        return
    }
    glInstance.enable(glInstance.BLEND)
    glInstance.blendFunc(glInstance.SRC_ALPHA, glInstance.ONE_MINUS_SRC_ALPHA)

    const FPS_THROTTLE = 1000.0 / 30.0 // Duration / frames
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

            // Rust Update Call

            // Rust Render Call
            
        }
    }
    
})





