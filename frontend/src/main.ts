import {createApp} from 'vue'
import './style.css'
// @ts-ignore
import App from './App.vue'

// Vuetify
import "vuetify/styles";
import {createVuetify} from "vuetify";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import {router} from "./router.ts";

createApp(App)
    .use(createVuetify({
        components,
        directives,
        theme: {
            defaultTheme: "dark"
        }
    }))
    .use(router)
    .mount('#app')
