use std::sync::Arc;
use std::sync::Mutex;

lazy_static! {
    static ref APP_STATE: Mutex<Arc<Store>> = Mutex::new(Arc::new(Store::new()));
}

pub fn update_state(time:f32,canvas_height: f32, canvas_width: f32) {
    let min_height_width = canvas_height.min(canvas_width);
    let display_size = 0.9 * min_height_width;
    let half_display_size = display_size / 2.;
    let half_canvas_height = canvas_height / 2.;
    let half_canvas_width = canvas_width / 2.;

    let mut state = APP_STATE.lock().unwrap();

    *state = Arc::new(Store {
        canvas_height: canvas_height,
        canvas_width: canvas_width,

        bottom: half_canvas_height - half_display_size,
        top: half_canvas_height + half_display_size,
        left: half_canvas_width - half_display_size,
        right: half_canvas_width + half_display_size,

        time:time,
        ..*state .clone()
    })
}

pub fn fetch_state() -> Arc<Store> {
    APP_STATE.lock().unwrap().clone()
}

pub struct Store {
    pub canvas_height: f32,
    pub canvas_width: f32,
    pub left: f32,
    pub right: f32,
    pub bottom: f32,
    pub top:f32,
    pub time: f32,
}

impl Store {
    fn new()-> Self {
        Self {
            canvas_height: 0.,
            canvas_width: 0.,
            left: 0.,
            right: 0.,
            bottom: 0.,
            top: 0.,
            time: 0.,
        }
    }
}