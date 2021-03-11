extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;
use web_sys::WebGlRenderingContext as GL;
use web_sys::*;

#[macro_use]
extern crate lazy_static;

mod gl_setup;
mod programs;
mod shaders;
mod store;
mod tools;
mod config;
#[wasm_bindgen]
pub struct Client {
    gl: WebGlRenderingContext,
    program_color_2d: programs::color_2d::Color2D,
    program_color_2d_gradient: programs::color_2d_gradient::Color2DGradient,
    program_graph_3d: programs::graph_3d::Graph3D,

}

#[wasm_bindgen]
impl Client {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Self {
        console_error_panic_hook::set_once();

        let gl = gl_setup::initialize_webgl_context().unwrap();
        Self {
            program_color_2d: programs::color_2d::Color2D::new(&gl),
            program_color_2d_gradient: programs::color_2d_gradient::Color2DGradient::new(&gl),
            program_graph_3d: programs::graph_3d::Graph3D::new(&gl),
            gl: gl,
        }
    }
    pub fn update(&mut self, time: f32, height: f32, width: f32) -> Result<(), JsValue> {
        store::update_state(time, height, width);
        Ok(())
    }

    pub fn render(&self) {
        self.gl.clear(GL::COLOR_BUFFER_BIT | GL::DEPTH_BUFFER_BIT);
        let cur_state = store::fetch_state();
        // self.program_color_2d.render(
        //     &self.gl,
        //     cur_state.bottom,
        //     cur_state.top,
        //     cur_state.left,
        //     cur_state.right,
        //     cur_state.canvas_height,
        //     cur_state.canvas_width,
        // );

        // self.program_color_2d_gradient.render(
        //     &self.gl,
        //     cur_state.bottom + 20.,
        //     cur_state.top - 20.,
        //     cur_state.left + 20.,
        //     cur_state.right - 20.,
        //     cur_state.canvas_height,
        //     cur_state.canvas_width,
        // );

        self.program_graph_3d.render(
            &self.gl,
            cur_state.bottom,
            cur_state.top,
            cur_state.left,
            cur_state.right,
            cur_state.canvas_height,
            cur_state.canvas_width,
            
            cur_state.rotation_x_axis,
            cur_state.rotation_y_axis,
            &tools::get_updated_3d_y_values(cur_state.time),
        );
    }
}
