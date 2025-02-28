export enum eDescription {
  FOOD = 1,
  CAR = 2,
  DRINK = 3,
  OTHERS = 4,
}

export const descriptionOptions = [
  {
    id: eDescription.FOOD,
    name: "Comida",
  },
  {
    id: eDescription.CAR,
    name: "Transporte",
  },
  {
    id: eDescription.DRINK,
    name: "Lazer",
  },
  {
    id: eDescription.OTHERS,
    name: "Outros",
  },
];
export const SVG_ICONS_DESCRIPTION: {
  [key: string]: string;
} = {
  [eDescription.FOOD]:
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M11.757 -0.017q0.096 0 0.192 0 0.2 0 0.401 0.001c0.171 0.001 0.341 0 0.512 0 0.132 0 0.264 0 0.396 0q0.094 0 0.189 0c0.088 0 0.176 0 0.264 0.001l0.078 -0.001c0.228 0.003 0.419 0.081 0.581 0.245 0.19 0.206 0.213 0.386 0.206 0.662 -0.025 0.215 -0.115 0.381 -0.271 0.53 -0.26 0.19 -0.543 0.187 -0.853 0.187 -0.076 0 -0.152 0 -0.228 0.001 -0.189 0.001 -0.377 0.002 -0.566 0.002q-0.24 0.001 -0.48 0.002c-0.075 0 -0.15 0 -0.225 0q-0.069 0 -0.138 0.001l-0.121 0c-0.134 0.015 -0.134 0.015 -0.226 0.106a1.75 1.75 0 0 0 -0.019 0.262l-0.002 0.077c-0.002 0.082 -0.002 0.163 -0.003 0.245q-0.001 0.083 -0.003 0.166c-0.002 0.135 -0.004 0.271 -0.005 0.406l0.059 0q0.714 -0.005 1.428 -0.008c0.23 -0.001 0.46 -0.002 0.691 -0.004q0.301 -0.002 0.602 -0.003c0.106 0 0.212 -0.001 0.319 -0.002 0.119 -0.001 0.238 -0.001 0.357 -0.001l0.105 -0.002c0.253 0.002 0.465 0.056 0.655 0.231 0.199 0.212 0.237 0.425 0.235 0.707l0.002 0.085c0 0.233 -0.056 0.413 -0.194 0.602l-0.052 0.05 -0.051 0.052c-0.078 0.056 -0.158 0.078 -0.249 0.107l-0.005 0.113c-0.021 0.472 -0.053 0.943 -0.086 1.414l-0.018 0.257q-0.022 0.31 -0.044 0.62l-0.036 0.504a4698.594 4698.594 0 0 1 -0.102 1.434l-0.006 0.078c-0.002 0.026 -0.004 0.051 -0.006 0.078q-0.045 0.625 -0.089 1.25 -0.046 0.644 -0.092 1.288 -0.026 0.361 -0.051 0.721 -0.022 0.307 -0.044 0.614 -0.011 0.156 -0.022 0.312c-0.096 1.357 -0.096 1.357 -0.355 1.714l-0.043 0.059L14.313 15.188l0.052 0c0.18 0.001 0.36 0.002 0.54 0.005q0.101 0.001 0.201 0.001c0.097 0 0.193 0.002 0.29 0.003l0.091 0c0.145 0.003 0.211 0.006 0.329 0.098 0.091 0.125 0.081 0.18 0.059 0.331 -0.048 0.069 -0.048 0.069 -0.125 0.125a1.656 1.656 0 0 1 -0.257 0.016l-0.08 0.001c-0.089 0 -0.177 0 -0.266 0a102.348 102.348 0 0 1 -0.72 0c-0.19 0 -0.38 0 -0.57 0.001 -0.351 0.001 -0.701 0 -1.052 0q-0.486 0 -0.972 0l-0.065 0 -0.261 0c-0.818 0 -1.635 0 -2.453 -0.001q-1.09 -0.001 -2.18 0a1892.906 1892.906 0 0 1 -2.774 0q-0.486 0 -0.971 0 -0.552 0.001 -1.104 0c-0.188 0 -0.376 0 -0.564 0q-0.258 0.001 -0.515 -0.001 -0.093 0 -0.187 0c-0.084 0 -0.169 0 -0.253 -0.001l-0.074 0.001c-0.108 -0.002 -0.171 -0.008 -0.26 -0.072 -0.057 -0.083 -0.064 -0.154 -0.067 -0.254C0.137 15.335 0.198 15.288 0.281 15.219c0.107 -0.021 0.107 -0.021 0.227 -0.022l0.064 -0.001a12.563 12.563 0 0 1 0.203 -0.002q0.069 -0.001 0.138 -0.002c0.112 -0.002 0.224 -0.003 0.337 -0.003l-0.045 -0.068C0.891 14.637 0.883 14.188 0.875 13.625l-0.074 -0.032C0.483 13.446 0.285 13.266 0.156 12.938c-0.083 -0.254 -0.066 -0.593 0.048 -0.833C0.361 11.852 0.557 11.655 0.844 11.563c0.106 -0.019 0.205 -0.027 0.313 -0.031v-0.563l-0.156 -0.063c-0.168 -0.115 -0.283 -0.261 -0.332 -0.462 -0.143 -0.848 0.094 -1.708 0.588 -2.404 0.578 -0.789 1.56 -1.582 2.554 -1.749L3.906 6.281a232.188 232.188 0 0 0 -0.199 -0.262l-0.057 -0.075 -0.055 -0.072 -0.051 -0.066c-0.045 -0.059 -0.045 -0.059 -0.107 -0.118l-0.073 0.032c-0.399 0.171 -0.806 0.276 -1.235 0.142 -0.255 -0.11 -0.45 -0.286 -0.57 -0.537 -0.119 -0.333 -0.09 -0.657 0.049 -0.978 0.097 -0.192 0.202 -0.386 0.361 -0.534 -0.039 -0.081 -0.081 -0.153 -0.131 -0.229 -0.051 -0.09 -0.057 -0.121 -0.059 -0.231 0.04 -0.125 0.075 -0.165 0.189 -0.229 0.122 -0.015 0.213 -0.011 0.313 0.063 0.056 0.07 0.107 0.143 0.156 0.219a25.063 25.063 0 0 0 0.281 -0.095l0.094 -0.032 0.094 -0.032c0.342 -0.103 0.679 -0.095 1 0.066 0.275 0.169 0.423 0.373 0.5 0.688 0.051 0.398 -0.052 0.744 -0.287 1.066l-0.064 0.08c-0.049 0.064 -0.083 0.124 -0.118 0.197l0.211 0.272 0.06 0.077 0.059 0.075 0.057 0.073a7.531 7.531 0 0 0 0.128 0.158C4.5 6.063 4.5 6.063 4.5 6.125l0.082 -0.021c0.467 -0.104 0.942 -0.082 1.418 -0.073l-0.013 -0.111C5.943 5.509 5.92 5.1 5.906 4.688l-0.089 -0.028c-0.21 -0.073 -0.31 -0.22 -0.411 -0.409 -0.048 -0.145 -0.04 -0.291 -0.041 -0.443l-0.003 -0.096c-0.002 -0.242 0.038 -0.407 0.197 -0.592l0.06 -0.05 0.059 -0.051c0.221 -0.149 0.407 -0.155 0.668 -0.153h0.114c0.102 0 0.205 0.001 0.307 0.001 0.107 0.001 0.214 0.001 0.321 0.001 0.203 0 0.405 0.001 0.608 0.002 0.231 0.001 0.462 0.002 0.692 0.002q0.712 0.002 1.424 0.005l-0.001 -0.053c-0.002 -0.184 -0.004 -0.368 -0.005 -0.552q-0.001 -0.103 -0.002 -0.205c-0.007 -0.642 0.028 -1.16 0.492 -1.649C10.729 0.016 11.198 -0.019 11.757 -0.017" fill="#010100"/><path d="m5.329 6.558 0.066 0q0.069 0 0.137 0c0.069 0 0.138 0 0.207 0 0.341 0 0.672 0.014 1.005 0.092l0.073 0.017A23.375 23.375 0 0 1 7.031 6.719l0.113 0.027C7.816 6.923 8.435 7.245 8.969 7.688l0.078 0.063c0.534 0.452 0.972 1.156 1.041 1.861 0.01 0.132 0.014 0.264 0.016 0.396l0.003 0.083c0.001 0.131 -0.001 0.203 -0.07 0.317 -0.099 0.089 -0.178 0.096 -0.305 0.096l-0.09 0h-0.099l-0.105 0q-0.175 0 -0.35 0.001l-0.251 0.001c-0.251 0.001 -0.502 0.001 -0.753 0.001l-0.354 0a1515.594 1515.594 0 0 1 -1.56 0.001c-0.411 0 -0.821 0.001 -1.232 0.002q-0.632 0.002 -1.264 0.002c-0.237 0 -0.473 0 -0.71 0.001q-0.302 0.001 -0.604 0.001 -0.154 0 -0.308 0.001c-0.111 0.001 -0.223 0 -0.334 0l-0.099 0.001c-0.139 -0.001 -0.219 -0.002 -0.34 -0.076 -0.167 -0.186 -0.103 -0.519 -0.096 -0.755 0.047 -0.759 0.516 -1.457 1.067 -1.956C2.807 7.242 3.569 6.809 4.313 6.719l0.033 0.044q0.133 0.175 0.267 0.349a8.938 8.938 0 0 1 0.181 0.243c0.118 0.161 0.118 0.161 0.29 0.254 0.108 -0.006 0.108 -0.006 0.195 -0.078 0.077 -0.11 0.082 -0.148 0.064 -0.279 -0.047 -0.074 -0.091 -0.137 -0.146 -0.203l-0.041 -0.051a7.469 7.469 0 0 0 -0.17 -0.204C4.875 6.662 4.875 6.662 4.875 6.594c0.153 -0.025 0.298 -0.035 0.454 -0.035" fill="#FE9700"/><path d="M8.156 6.563h6.5c0 0.387 0 0.387 -0.011 0.541l-0.008 0.107 -0.008 0.113 -0.009 0.122q-0.009 0.131 -0.019 0.262 -0.015 0.21 -0.03 0.419a904.969 904.969 0 0 1 -0.048 0.669 1976.188 1976.188 0 0 0 -0.111 1.539c-0.048 0.666 -0.094 1.332 -0.133 1.999l-0.005 0.085q-0.005 0.077 -0.009 0.154c-0.006 0.097 -0.014 0.178 -0.045 0.271h-3.094l-0.031 -0.5c-0.084 -0.283 -0.22 -0.494 -0.475 -0.652 -0.166 -0.085 -0.342 -0.108 -0.525 -0.129 -0.043 -0.539 -0.043 -0.539 0.057 -0.666 0.074 -0.043 0.074 -0.043 0.151 -0.079 0.121 -0.061 0.178 -0.164 0.229 -0.286 0.059 -0.194 0.075 -0.376 0.082 -0.578l0.004 -0.087q0.004 -0.105 0.008 -0.21l0.073 -0.031c0.296 -0.135 0.525 -0.313 0.645 -0.625 0.076 -0.321 0.058 -0.603 -0.105 -0.891 -0.061 -0.092 -0.123 -0.164 -0.208 -0.234l-0.074 -0.066c-0.189 -0.135 -0.351 -0.169 -0.578 -0.166l-0.075 0c-0.166 0.004 -0.297 0.028 -0.444 0.111C9.813 7.781 9.813 7.781 9.75 7.781c-0.042 -0.044 -0.042 -0.044 -0.092 -0.105C9.245 7.194 8.718 6.875 8.156 6.594z" fill="#F3F3F3"/><path d="M1.438 13.625c0.264 -0.007 0.528 -0.013 0.792 -0.016 0.123 -0.002 0.245 -0.004 0.368 -0.007 0.119 -0.003 0.237 -0.005 0.356 -0.006a5.406 5.406 0 0 0 0.135 -0.003c0.354 -0.013 0.354 -0.013 0.499 0.102 0.075 0.085 0.075 0.085 0.137 0.17 0.075 0.097 0.136 0.13 0.256 0.145 0.167 0.001 0.285 -0.004 0.426 -0.103l0.053 -0.067c0.1 -0.123 0.179 -0.203 0.337 -0.24 0.133 -0.009 0.264 -0.009 0.397 -0.006q0.076 0 0.153 0c0.137 0 0.275 0.002 0.412 0.004 0.144 0.002 0.287 0.002 0.431 0.002 0.272 0.001 0.544 0.003 0.816 0.006 0.31 0.003 0.619 0.005 0.929 0.006 0.637 0.003 1.274 0.008 1.91 0.014 0.001 0.116 0.002 0.231 0.003 0.347l0.001 0.099c0.002 0.373 -0.078 0.593 -0.341 0.864 -0.238 0.224 -0.501 0.299 -0.822 0.296l-0.082 0c-0.09 0 -0.18 0 -0.27 0q-0.097 0 -0.194 0.001c-0.175 0 -0.351 0 -0.526 0 -0.184 0 -0.368 0 -0.552 0q-0.463 0 -0.927 -0.001c-0.357 -0.001 -0.713 0 -1.07 0q-0.46 0.001 -0.92 0 -0.274 0 -0.549 0 -0.258 0 -0.516 0 -0.095 0 -0.189 0c-0.472 0.001 -0.807 -0.018 -1.168 -0.348 -0.238 -0.243 -0.29 -0.505 -0.288 -0.834l0.001 -0.094 0.001 -0.096q0.001 -0.117 0.002 -0.234" fill="#FD9700"/><path d="M6.469 4.719h8.313c0 0.438 -0.031 0.876 -0.063 1.313H6.531c-0.034 -0.437 -0.063 -0.875 -0.063 -1.313" fill="#F34234"/><path d="M1.719 11.031h7.844v0.5l-0.13 0a216.656 216.656 0 0 0 -1.214 0.001c-0.208 0.001 -0.416 0.001 -0.624 0.001 -0.201 -0.001 -0.402 0 -0.602 0.001q-0.115 0 -0.23 0c-0.107 -0.001 -0.215 0 -0.322 0.001l-0.096 -0.002c-0.201 0.004 -0.304 0.046 -0.446 0.189 -0.018 0.019 -0.036 0.039 -0.055 0.059q-0.048 0.046 -0.095 0.092a25.031 25.031 0 0 0 -0.091 0.091l-0.051 0.051a112.031 112.031 0 0 0 -0.163 0.164l-0.115 0.115q-0.15 0.15 -0.299 0.3 -0.153 0.153 -0.306 0.307 -0.299 0.3 -0.599 0.6c-0.128 -0.058 -0.21 -0.144 -0.303 -0.248l-0.05 -0.055c-0.123 -0.137 -0.24 -0.278 -0.355 -0.421 -0.084 -0.1 -0.171 -0.196 -0.261 -0.291 -0.14 -0.15 -0.272 -0.304 -0.401 -0.464a9.25 9.25 0 0 0 -0.218 -0.257l-0.067 -0.076c-0.1 -0.097 -0.186 -0.132 -0.324 -0.138l-0.076 -0.004 -0.078 -0.003 -0.08 -0.004A30.563 30.563 0 0 0 1.719 11.531z" fill="#FEDB00"/><path d="m6.425 3.386 0.113 -0.001c0.103 -0.001 0.206 0 0.309 0 0.111 0 0.222 0 0.333 -0.001a123.75 123.75 0 0 1 0.653 0q0.265 0 0.531 0l0.076 0 0.153 0c0.479 0 0.959 0 1.438 0.001q0.617 0.001 1.234 0a520.156 520.156 0 0 1 1.586 -0.001l0.076 0c0.177 0 0.353 0 0.53 0q0.323 -0.001 0.646 0.001c0.11 0 0.22 0.001 0.33 0 0.119 -0.001 0.238 0 0.357 0.001l0.105 -0.001c0.261 0.003 0.261 0.003 0.377 0.094 0.092 0.107 0.095 0.163 0.09 0.302l-0.002 0.113c-0.017 0.111 -0.043 0.173 -0.11 0.262 -0.077 0.038 -0.127 0.035 -0.212 0.036l-0.096 0 -0.107 0 -0.113 0q-0.155 0.001 -0.311 0.001 -0.167 0 -0.335 0.001 -0.405 0.001 -0.809 0.002l-0.228 0a1675 1675 0 0 1 -1.829 0.002c-0.441 0 -0.882 0.001 -1.323 0.003q-0.679 0.002 -1.358 0.002c-0.254 0 -0.508 0 -0.763 0.002 -0.216 0.001 -0.433 0.001 -0.649 0.001 -0.11 0 -0.221 0 -0.331 0.001 -0.12 0.001 -0.239 0 -0.359 0l-0.106 0.001c-0.234 -0.002 -0.234 -0.002 -0.358 -0.093 -0.075 -0.111 -0.077 -0.185 -0.076 -0.318l-0.001 -0.122c0.056 -0.304 0.283 -0.291 0.54 -0.288" fill="#9D9D9D"/><path d="m10.922 13.367 0.087 0 0.095 0.001h0.101c0.11 0 0.22 0.001 0.33 0.001l0.229 0c0.201 0 0.402 0.001 0.603 0.002 0.205 0.001 0.41 0.001 0.615 0.001 0.402 0.001 0.804 0.002 1.206 0.003l-0.006 0.108 -0.009 0.143 -0.004 0.071c-0.007 0.112 -0.013 0.223 -0.017 0.335 -0.017 0.415 -0.127 0.681 -0.432 0.968 -0.24 0.195 -0.501 0.233 -0.802 0.229l-0.097 0c-0.105 0 -0.21 -0.001 -0.315 -0.002q-0.11 0 -0.219 0c-0.192 0 -0.384 -0.001 -0.576 -0.002 -0.196 -0.001 -0.392 -0.001 -0.588 -0.002q-0.576 -0.002 -1.153 -0.005l0.052 -0.089 0.068 -0.118 0.034 -0.058c0.248 -0.429 0.245 -0.877 0.252 -1.361l0.065 -0.032 0.085 -0.042 0.085 -0.042c0.213 -0.111 0.213 -0.111 0.312 -0.11" fill="#F34234"/><path d="M8.08 11.995c0.234 0.009 0.467 0.012 0.701 0.015 0.201 0.003 0.402 0.007 0.602 0.011l0.065 0.001c0.141 0.003 0.282 0.008 0.423 0.013l0.107 0.003c0.225 0.01 0.384 0.039 0.546 0.208 0.096 0.157 0.124 0.258 0.101 0.442 -0.056 0.184 -0.128 0.268 -0.281 0.375 -0.125 0.061 -0.225 0.07 -0.364 0.07l-0.062 0c-0.068 0 -0.136 0 -0.205 -0.001h-0.147c-0.133 0 -0.266 0 -0.398 -0.001 -0.139 0 -0.278 0 -0.417 -0.001 -0.263 0 -0.526 -0.001 -0.789 -0.001 -0.299 -0.001 -0.599 -0.001 -0.898 -0.001Q6.142 13.127 5.219 13.125l0.036 -0.041c0.107 -0.121 0.196 -0.245 0.282 -0.382 0.615 -0.876 1.585 -0.745 2.542 -0.708" fill="#81592B"/><path d="M13.459 7.173c0.294 0.185 0.463 0.406 0.572 0.733 0.025 0.357 -0.029 0.65 -0.25 0.938 -0.211 0.219 -0.496 0.344 -0.801 0.357 -0.302 -0.017 -0.573 -0.135 -0.785 -0.351 -0.203 -0.248 -0.282 -0.529 -0.269 -0.846C11.962 7.699 12.115 7.481 12.344 7.281c0.32 -0.233 0.753 -0.282 1.115 -0.108" fill="#020303"/><path d="M14.125 6.563h0.531c0.003 0.255 -0.008 0.507 -0.027 0.761l-0.009 0.122q-0.009 0.131 -0.019 0.262 -0.015 0.21 -0.03 0.419a904.969 904.969 0 0 1 -0.048 0.669 1976.188 1976.188 0 0 0 -0.111 1.539c-0.048 0.666 -0.094 1.332 -0.133 1.999l-0.005 0.085q-0.005 0.077 -0.009 0.154c-0.006 0.097 -0.014 0.178 -0.045 0.271h-0.531a98.438 98.438 0 0 1 0.116 -1.773l0.007 -0.097q0.03 -0.398 0.06 -0.797 0.023 -0.3 0.045 -0.601 0.01 -0.139 0.021 -0.278l0.013 -0.17 0.006 -0.076c0.033 -0.268 0.033 -0.268 -0.018 -0.521q0.024 -0.098 0.048 -0.196c0.022 -0.129 0.018 -0.255 0.014 -0.385C14 7.875 14 7.875 14.031 7.844c0.009 -0.095 0.017 -0.189 0.024 -0.283l0.006 -0.086q0.01 -0.137 0.019 -0.273l0.013 -0.185q0.016 -0.227 0.032 -0.454" fill="#CDD6DA"/><path d="m11.435 0.515 0.08 -0.001a22.469 22.469 0 0 1 0.258 0q0.09 0 0.181 -0.001 0.188 0 0.377 0c0.161 0.001 0.322 0 0.483 -0.001 0.124 -0.001 0.248 -0.001 0.372 0q0.089 0 0.178 -0.001c0.083 -0.001 0.166 0 0.249 0.001l0.074 -0.001c0.125 0.002 0.183 0.016 0.282 0.094C14.031 0.688 14.031 0.688 14.049 0.781c-0.021 0.114 -0.062 0.167 -0.143 0.25 -0.092 0.046 -0.185 0.035 -0.286 0.035l-0.143 0 -0.077 0c-0.134 0 -0.269 0.001 -0.403 0.001 -0.171 0.001 -0.342 0.001 -0.512 0.001 -0.138 0 -0.276 0 -0.414 0.001q-0.079 0 -0.157 0c-0.3 -0.002 -0.552 0.004 -0.789 0.212 -0.186 0.203 -0.228 0.415 -0.232 0.684l-0.002 0.079c-0.002 0.083 -0.003 0.166 -0.005 0.248q-0.002 0.085 -0.004 0.169Q10.879 2.669 10.875 2.875h-0.5q-0.005 -0.326 -0.007 -0.652 -0.001 -0.111 -0.003 -0.222c-0.002 -0.107 -0.002 -0.213 -0.003 -0.32l-0.002 -0.099c0 -0.31 0.093 -0.522 0.304 -0.748 0.222 -0.222 0.458 -0.323 0.77 -0.32" fill="#00B9D0"/><path d="M12.483 10.521c0.193 0.088 0.366 0.243 0.453 0.438 0.074 0.24 0.067 0.503 -0.048 0.727 -0.124 0.182 -0.301 0.316 -0.512 0.376 -0.26 0.033 -0.474 0.002 -0.688 -0.156 -0.175 -0.176 -0.284 -0.385 -0.297 -0.635 0.007 -0.214 0.08 -0.389 0.224 -0.548 0.25 -0.226 0.538 -0.291 0.868 -0.203" fill="#020303"/><path d="m1.281 12.038 0.07 -0.002q0.073 -0.002 0.147 -0.002c0.074 -0.001 0.148 -0.004 0.222 -0.008 0.193 -0.005 0.345 -0.008 0.505 0.109 0.079 0.087 0.147 0.174 0.213 0.271a15.531 15.531 0 0 0 0.141 0.172c0.022 0.028 0.045 0.056 0.068 0.085 0.104 0.126 0.215 0.245 0.326 0.365C3.031 13.094 3.031 13.094 3.031 13.125q-0.38 0.003 -0.76 0.005c-0.118 0.001 -0.235 0.001 -0.353 0.002 -0.114 0.001 -0.227 0.002 -0.341 0.002q-0.065 0 -0.13 0.001c-0.061 0.001 -0.122 0.001 -0.182 0.001l-0.105 0.001c-0.164 -0.019 -0.285 -0.087 -0.388 -0.214l-0.047 -0.056c-0.09 -0.129 -0.09 -0.278 -0.069 -0.429 0.11 -0.282 0.331 -0.393 0.625 -0.399" fill="#81592B"/><path d="M3.676 3.801c0.127 0.127 0.206 0.224 0.219 0.406 -0.013 0.293 -0.189 0.553 -0.386 0.761 -0.292 0.263 -0.648 0.436 -1.045 0.421 -0.18 -0.029 -0.294 -0.11 -0.4 -0.256 -0.073 -0.236 -0.039 -0.392 0.07 -0.613l0.028 -0.058c0.057 -0.107 0.11 -0.179 0.214 -0.243l0.04 0.055c0.118 0.153 0.118 0.153 0.294 0.219 0.12 -0.027 0.162 -0.045 0.229 -0.148 0.018 -0.106 0.026 -0.18 -0.035 -0.272 -0.039 -0.046 -0.08 -0.09 -0.121 -0.134v-0.063c0.283 -0.129 0.599 -0.207 0.895 -0.074" fill="#A1C100"/><path d="M7.344 6.813c0.602 0.183 1.14 0.477 1.625 0.875l0.078 0.063c0.534 0.453 0.972 1.156 1.041 1.861 0.01 0.132 0.014 0.264 0.016 0.396l0.003 0.083c0.001 0.131 -0.001 0.203 -0.07 0.317 -0.099 0.089 -0.178 0.096 -0.306 0.096l-0.09 0 -0.099 0 -0.105 0q-0.176 0 -0.351 0l-0.251 0q-0.271 0 -0.542 0 -0.392 0 -0.783 0a2372.031 2372.031 0 0 1 -1.271 -0.001q-0.617 0 -1.235 -0.001h-0.077l-0.382 0Q2.959 10.501 1.375 10.5v-0.031l8.125 -0.031c0.162 -0.324 0.051 -0.951 -0.052 -1.293 -0.362 -0.991 -1.029 -1.69 -1.939 -2.205A9.094 9.094 0 0 1 7.344 6.844z" fill="#EA7800"/><path d="M13.656 13.375h0.531c-0.007 0.128 -0.015 0.257 -0.023 0.385a11.906 11.906 0 0 0 -0.013 0.267c-0.019 0.418 -0.125 0.684 -0.433 0.973 -0.24 0.195 -0.501 0.233 -0.802 0.229l-0.097 0c-0.105 0 -0.21 -0.001 -0.315 -0.002q-0.11 0 -0.219 0c-0.192 0 -0.384 -0.001 -0.576 -0.002 -0.196 -0.001 -0.392 -0.001 -0.588 -0.002q-0.576 -0.002 -1.153 -0.005v-0.031l0.118 0.001q0.552 0.003 1.103 0.002c0.189 0 0.378 0 0.567 0.001 0.183 0.001 0.365 0.001 0.548 0q0.104 0 0.209 0.001c0.369 0.018 0.369 0.018 0.708 -0.096 0.065 -0.071 0.11 -0.135 0.153 -0.221l0.041 -0.07c0.109 -0.191 0.153 -0.396 0.165 -0.614l0.007 -0.12 0.007 -0.124q0.007 -0.122 0.015 -0.244l0.006 -0.109C13.625 13.5 13.625 13.5 13.656 13.375" fill="#C5201F"/><path d="M4.688 13.625h5.156c0 0.963 0 0.963 -0.337 1.31 -0.186 0.174 -0.394 0.277 -0.65 0.29L8.781 15.219l0.066 -0.063c0.44 -0.448 0.437 -0.841 0.465 -1.5H4.688z" fill="#DD7200"/><path d="m12.969 7.613 0.096 -0.001c0.196 0.027 0.29 0.145 0.404 0.294 0.063 0.125 0.051 0.27 0.031 0.406 -0.065 0.137 -0.153 0.225 -0.275 0.313 -0.15 0.047 -0.292 0.064 -0.443 0.009 -0.155 -0.082 -0.257 -0.186 -0.313 -0.352 -0.025 -0.2 -0.004 -0.341 0.107 -0.51 0.117 -0.125 0.224 -0.16 0.393 -0.158" fill="#00B9D0"/><path d="M3.219 3.75c0.303 -0.019 0.303 -0.019 0.451 0.051 0.133 0.123 0.212 0.222 0.225 0.406 -0.013 0.293 -0.189 0.553 -0.386 0.761 -0.307 0.276 -0.65 0.426 -1.063 0.412L2.375 5.375v-0.031l0.053 0.001c0.223 -0.009 0.328 -0.092 0.478 -0.251l0.059 -0.058c0.252 -0.264 0.356 -0.573 0.355 -0.932 -0.01 -0.135 -0.044 -0.232 -0.101 -0.354" fill="#8DA800"/><path d="M5.813 11.781c-0.166 0.201 -0.349 0.384 -0.534 0.568l-0.1 0.1a281.313 281.313 0 0 1 -0.262 0.261q-0.134 0.133 -0.268 0.267Q4.387 13.239 4.125 13.5c-0.119 -0.047 -0.175 -0.117 -0.25 -0.219a57.375 57.375 0 0 1 0.564 -0.587 24.875 24.875 0 0 0 0.262 -0.272 17.219 17.219 0 0 1 0.254 -0.263 5.75 5.75 0 0 0 0.096 -0.101c0.234 -0.251 0.413 -0.326 0.762 -0.278" fill="#F5BB07"/><path d="M14.281 4.719h0.5c0.003 0.303 -0.008 0.6 -0.031 0.902 -0.003 0.04 -0.006 0.08 -0.009 0.12q-0.011 0.145 -0.022 0.29h-0.531c0.024 -0.882 0.024 -0.882 0.094 -1.313" fill="#C71E1E"/><path d="M9.906 12.063c0.362 -0.024 0.362 -0.024 0.515 0.082 0.125 0.116 0.211 0.248 0.219 0.42 -0.022 0.176 -0.064 0.311 -0.199 0.43 -0.157 0.11 -0.271 0.139 -0.461 0.138l-0.062 0c-0.068 0 -0.136 0 -0.205 -0.001h-0.147c-0.133 0 -0.266 0 -0.398 -0.001 -0.139 0 -0.278 0 -0.417 -0.001 -0.263 0 -0.526 -0.001 -0.789 -0.001 -0.299 -0.001 -0.599 -0.001 -0.898 -0.001Q6.142 13.127 5.219 13.125c0.063 -0.063 0.063 -0.063 0.143 -0.07l0.104 0.001 0.119 0.001 0.131 0.002q0.069 0.001 0.138 0.001c0.125 0.001 0.25 0.002 0.374 0.003 0.13 0.001 0.261 0.002 0.391 0.003 0.247 0.002 0.494 0.004 0.741 0.006 0.281 0.003 0.562 0.005 0.843 0.007q0.867 0.007 1.735 0.015l0.029 -0.073a5.125 5.125 0 0 1 0.068 -0.161c0.083 -0.231 0.031 -0.455 -0.067 -0.672A13.625 13.625 0 0 0 9.906 12.063" fill="#5D411F"/><path d="M1.688 12.063c0.366 -0.052 0.366 -0.052 0.526 0.064 0.081 0.09 0.153 0.182 0.224 0.279q0.07 0.086 0.141 0.172c0.022 0.028 0.045 0.056 0.068 0.085 0.104 0.126 0.215 0.245 0.326 0.365C3.031 13.094 3.031 13.094 3.031 13.125H1.063v-0.031l1.469 -0.031 -0.313 -0.344c-0.145 -0.176 -0.145 -0.176 -0.213 -0.261 -0.088 -0.107 -0.18 -0.21 -0.273 -0.312C1.688 12.094 1.688 12.094 1.688 12.063" fill="#5E411F"/><path d="M10.535 8.145c0.158 0.069 0.273 0.162 0.34 0.323 0.035 0.189 0.006 0.346 -0.089 0.512 -0.046 0.066 -0.088 0.108 -0.161 0.145h-0.125l-0.02 -0.053c-0.031 -0.081 -0.063 -0.162 -0.095 -0.243l-0.032 -0.084c-0.063 -0.16 -0.133 -0.303 -0.229 -0.445C10.094 8.25 10.094 8.25 10.094 8.188c0.136 -0.091 0.29 -0.089 0.441 -0.042" fill="#00B7CE"/><path d="M14.75 3.406c0.401 -0.027 0.401 -0.027 0.525 0.051 0.111 0.116 0.087 0.287 0.084 0.438 -0.017 0.111 -0.043 0.173 -0.109 0.262 -0.094 0.047 -0.181 0.034 -0.285 0.033l-0.121 -0.001L14.75 4.188l0.015 -0.054c0.016 -0.07 0.02 -0.131 0.02 -0.203l0 -0.074 0 -0.077 0 -0.077 0 -0.074 0 -0.068c-0.002 -0.067 -0.002 -0.067 -0.035 -0.154" fill="#6F6F6F"/><path d="M9.063 11.031h0.5v0.5h-0.5z" fill="#FEC108"/><path d="M4.328 8.387C4.438 8.406 4.438 8.406 4.531 8.469c0.064 0.096 0.073 0.115 0.064 0.223 -0.017 0.082 -0.03 0.118 -0.084 0.184 -0.106 0.045 -0.179 0.047 -0.293 0.031 -0.106 -0.076 -0.149 -0.122 -0.176 -0.25 0.035 -0.168 0.119 -0.24 0.285 -0.27" fill="#090500"/><path d="M2.75 8.105c0.128 0.027 0.174 0.07 0.25 0.176 0.02 0.109 0.02 0.109 0 0.219 -0.076 0.106 -0.122 0.149 -0.25 0.176 -0.128 -0.027 -0.174 -0.07 -0.25 -0.176 -0.02 -0.109 -0.02 -0.109 0 -0.219 0.076 -0.106 0.122 -0.149 0.25 -0.176" fill="#090500"/><path d="M3.938 7.375c0.076 0.053 0.076 0.053 0.125 0.125 0.02 0.117 0.009 0.171 -0.049 0.275 -0.1 0.09 -0.161 0.102 -0.295 0.1 -0.09 -0.047 -0.09 -0.047 -0.156 -0.125 -0.033 -0.107 -0.033 -0.107 -0.031 -0.219 0.117 -0.186 0.195 -0.204 0.406 -0.156" fill="#090500"/><path d="M1.986 9.436c0.117 0.036 0.165 0.056 0.232 0.158 0.018 0.107 0.018 0.107 0 0.219 -0.076 0.106 -0.122 0.149 -0.25 0.176 -0.128 -0.027 -0.174 -0.07 -0.25 -0.176 -0.025 -0.14 -0.016 -0.195 0.064 -0.313 0.092 -0.063 0.092 -0.063 0.203 -0.064" fill="#080500"/><path d="M12.251 11.016c0.111 0.027 0.156 0.078 0.218 0.171 0.002 0.124 -0.013 0.192 -0.082 0.295 -0.106 0.069 -0.169 0.068 -0.293 0.049 -0.106 -0.077 -0.15 -0.121 -0.174 -0.25 0.037 -0.196 0.126 -0.279 0.331 -0.265" fill="#00B6CD"/><path d="M6.531 7.094c0.094 0.063 0.094 0.063 0.156 0.156 0.01 0.09 -0.001 0.165 -0.031 0.25 -0.073 0.09 -0.119 0.093 -0.234 0.107 -0.109 -0.014 -0.109 -0.014 -0.184 -0.063 -0.069 -0.103 -0.084 -0.171 -0.082 -0.295 0.104 -0.153 0.194 -0.189 0.375 -0.156" fill="#070400"/><path d="M3.375 9.188c0.092 0.047 0.092 0.047 0.156 0.125 0.029 0.125 0.019 0.218 -0.047 0.328 -0.111 0.066 -0.202 0.072 -0.328 0.047 -0.078 -0.047 -0.078 -0.047 -0.125 -0.125 -0.025 -0.127 -0.02 -0.218 0.049 -0.328 0.106 -0.065 0.172 -0.064 0.295 -0.047" fill="#050300"/></svg>',
  [eDescription.CAR]:
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M6.105 3.335q0.077 0 0.155 0c0.139 0 0.279 0 0.418 0q0.175 0 0.35 0 0.413 -0.001 0.825 0c0.283 0 0.566 0 0.85 -0.001q0.366 -0.001 0.731 -0.001c0.145 0 0.291 0 0.436 0q0.205 -0.001 0.41 0 0.075 0 0.15 0c0.51 -0.002 0.954 0.092 1.335 0.454 0.168 0.189 0.293 0.406 0.423 0.621l0.105 0.171q0.112 0.183 0.222 0.366c0.118 0.195 0.238 0.389 0.359 0.583a97.875 97.875 0 0 1 0.291 0.472l0.069 0.112q0.067 0.108 0.133 0.217l0.061 0.1 0.054 0.088L13.531 6.594l0.038 0.064c0.075 0.082 0.135 0.091 0.243 0.114l0.117 0.026 0.127 0.026q0.065 0.014 0.13 0.028c0.115 0.025 0.229 0.049 0.344 0.073a107.875 107.875 0 0 1 0.549 0.117c0.064 0.014 0.127 0.027 0.191 0.04 0.521 0.111 0.521 0.111 0.698 0.355 0.038 0.077 0.035 0.127 0.036 0.212l0.001 0.096 0 0.106 0.001 0.111c0.001 0.122 0.001 0.243 0.001 0.365l0 0.126q0.001 0.295 0.001 0.59 0 0.34 0.002 0.681 0.001 0.263 0.002 0.526c0 0.105 0 0.209 0.001 0.314 0.001 0.117 0.001 0.234 0.001 0.351l0.001 0.105c-0.001 0.192 -0.012 0.305 -0.141 0.45 -0.142 0.128 -0.237 0.161 -0.426 0.157l-0.109 -0.002 -0.118 -0.002q-0.156 -0.001 -0.312 -0.001a16.813 16.813 0 0 1 -0.326 -0.004c-0.126 -0.003 -0.251 -0.003 -0.377 -0.002l-0.117 -0.004c-0.114 0.002 -0.2 0.007 -0.307 0.046 -0.108 0.113 -0.176 0.238 -0.25 0.375 -0.262 0.327 -0.707 0.578 -1.125 0.625 -0.565 0.042 -1.068 -0.07 -1.508 -0.445 -0.176 -0.166 -0.339 -0.348 -0.398 -0.586H5.5l-0.063 0.188c-0.236 0.353 -0.541 0.602 -0.938 0.75l-0.078 0.03c-0.46 0.152 -0.979 0.087 -1.406 -0.124 -0.231 -0.132 -0.498 -0.309 -0.62 -0.552 -0.094 -0.187 -0.094 -0.187 -0.266 -0.291 -0.111 -0.01 -0.217 -0.01 -0.329 -0.006l-0.184 0c-0.086 0 -0.171 0.002 -0.257 0.004 -0.15 0.003 -0.3 0.004 -0.449 0.004q-0.119 0.001 -0.239 0.003c-0.212 0.003 -0.373 0.004 -0.536 -0.148 -0.093 -0.121 -0.14 -0.186 -0.141 -0.338l-0.001 -0.086 -0.001 -0.095 -0.001 -0.1c-0.001 -0.109 -0.002 -0.219 -0.002 -0.328l-0.001 -0.113q-0.002 -0.297 -0.002 -0.595 -0.001 -0.246 -0.003 -0.491c-0.002 -0.198 -0.003 -0.396 -0.003 -0.593a25.969 25.969 0 0 0 -0.002 -0.226C-0.026 8.051 -0.028 7.709 0.293 7.344c0.175 -0.173 0.41 -0.24 0.645 -0.289l0.085 -0.019c0.383 -0.083 0.769 -0.158 1.153 -0.234l0.081 -0.016q0.076 -0.015 0.153 -0.03c0.183 -0.025 0.183 -0.025 0.324 -0.129l0.053 -0.085c0.127 -0.197 0.26 -0.39 0.395 -0.582 0.143 -0.205 0.286 -0.411 0.428 -0.617a112.156 112.156 0 0 1 0.549 -0.792c0.077 -0.11 0.153 -0.221 0.229 -0.332 0.289 -0.424 0.591 -0.75 1.117 -0.863 0.199 -0.029 0.401 -0.022 0.602 -0.022" fill="#020101"/><path d="M6.104 3.856q0.076 0 0.152 -0.001c0.137 0 0.273 0 0.41 0.001 0.143 0.001 0.287 0 0.43 0 0.241 0 0.482 0.001 0.723 0.002 0.278 0.001 0.556 0.001 0.834 0.001 0.268 0 0.536 0 0.804 0.001q0.171 0 0.341 0 0.201 0 0.402 0.001 0.073 0 0.147 0c0.389 -0.001 0.723 0.034 1.028 0.295 0.171 0.213 0.309 0.454 0.451 0.688q0.033 0.053 0.065 0.107a242.719 242.719 0 0 1 0.135 0.221c0.105 0.172 0.211 0.344 0.317 0.516a218.25 218.25 0 0 1 0.353 0.574q0.068 0.111 0.136 0.222a108.781 108.781 0 0 1 0.095 0.156A26.375 26.375 0 0 0 13.094 6.906l0.041 0.068c0.154 0.24 0.408 0.268 0.668 0.328l0.1 0.024c0.367 0.086 0.736 0.167 1.104 0.248l0.072 0.016q0.067 0.015 0.135 0.029c0.087 0.019 0.171 0.04 0.256 0.068v0.313l-0.137 0.002q-0.09 0.003 -0.179 0.005l-0.09 0.001c-0.186 0.006 -0.295 0.025 -0.437 0.147 -0.169 0.187 -0.164 0.341 -0.166 0.582l-0.003 0.091c-0.002 0.204 0.026 0.372 0.138 0.546 0.135 0.11 0.248 0.158 0.42 0.166l0.08 0.004 0.083 0.004 0.085 0.004q0.103 0.005 0.206 0.01v0.5c-0.241 0.009 -0.481 0.015 -0.722 0.019q-0.123 0.003 -0.246 0.007c-0.118 0.004 -0.236 0.006 -0.353 0.008l-0.111 0.005c-0.106 0 -0.187 -0.004 -0.287 -0.039 -0.097 -0.104 -0.156 -0.217 -0.219 -0.344 -0.251 -0.324 -0.602 -0.509 -0.993 -0.613l-0.093 -0.025L12.375 9.063l0.001 -0.08q0.004 -0.375 0.003 -0.75c0 -0.129 0 -0.257 0.002 -0.385 0.03 -0.758 0.03 -0.758 -0.3 -1.412 -0.1 -0.121 -0.181 -0.255 -0.267 -0.386q-0.058 -0.086 -0.117 -0.172l-0.059 -0.087 -0.06 -0.088 -0.177 -0.262q-0.057 -0.085 -0.115 -0.17c-0.085 -0.126 -0.17 -0.252 -0.252 -0.38 -0.014 -0.022 -0.028 -0.043 -0.042 -0.065a8.125 8.125 0 0 1 -0.074 -0.118c-0.099 -0.153 -0.213 -0.242 -0.386 -0.3 -0.061 -0.003 -0.122 -0.004 -0.183 -0.005l-0.116 -0.001 -0.127 0 -0.134 -0.001q-0.22 -0.001 -0.439 -0.001l-0.151 0q-0.356 -0.001 -0.711 -0.001 -0.41 0 -0.82 -0.002 -0.317 -0.001 -0.634 -0.002c-0.126 0 -0.252 0 -0.379 -0.001q-0.178 -0.001 -0.356 -0.001 -0.065 0 -0.13 -0.001c-0.336 -0.004 -0.336 -0.004 -0.632 0.14 -0.066 0.063 -0.066 0.063 -0.111 0.137l-0.055 0.081 -0.056 0.087 -0.06 0.089c-0.062 0.094 -0.124 0.188 -0.186 0.282a139.5 139.5 0 0 1 -0.127 0.191c-0.183 0.263 -0.183 0.263 -0.344 0.54 -0.056 0.007 -0.056 0.007 -0.127 0.01 -0.16 0.015 -0.287 0.066 -0.404 0.178 -0.124 0.176 -0.11 0.367 -0.109 0.574l-0.003 0.104c-0.001 0.22 0.027 0.373 0.175 0.541 0.12 0.096 0.182 0.098 0.344 0.125v1.719c-0.281 -0.063 -0.281 -0.063 -0.364 -0.082 -0.455 -0.103 -0.936 -0.048 -1.34 0.192 -0.201 0.134 -0.447 0.303 -0.549 0.529 -0.043 0.092 -0.084 0.162 -0.154 0.237 -0.132 0.044 -0.257 0.037 -0.394 0.031l-0.115 -0.001c-0.121 -0.002 -0.241 -0.006 -0.362 -0.01q-0.123 -0.002 -0.246 -0.004A40.469 40.469 0 0 1 0.531 10.063v-0.5l0.113 -0.002c0.429 -0.005 0.429 -0.005 0.791 -0.212 0.099 -0.198 0.107 -0.378 0.107 -0.596l0.002 -0.091c0.001 -0.197 -0.023 -0.313 -0.139 -0.473 -0.127 -0.118 -0.224 -0.159 -0.396 -0.166l-0.085 -0.004 -0.088 -0.004 -0.089 -0.004q-0.109 -0.005 -0.218 -0.01c0.055 -0.19 0.136 -0.28 0.31 -0.377 0.07 -0.031 0.133 -0.047 0.208 -0.061l0.088 -0.017 0.096 -0.018c0.033 -0.007 0.067 -0.013 0.101 -0.02 0.192 -0.038 0.385 -0.074 0.578 -0.108 0.104 -0.019 0.209 -0.038 0.313 -0.057q0.077 -0.014 0.155 -0.028c0.073 -0.013 0.147 -0.026 0.22 -0.039l0.066 -0.011c0.208 -0.039 0.349 -0.131 0.475 -0.3l0.056 -0.075a14.688 14.688 0 0 0 0.239 -0.344q0.053 -0.078 0.106 -0.156l0.056 -0.083c0.103 -0.151 0.208 -0.301 0.312 -0.451A97.563 97.563 0 0 0 4.328 5.25l0.081 -0.117q0.075 -0.11 0.15 -0.22c0.065 -0.096 0.131 -0.192 0.197 -0.288l0.062 -0.092c0.349 -0.508 0.668 -0.683 1.286 -0.678" fill="#FD816D"/><path d="M5.156 7.469h3.625v2.594c-0.808 0.016 -0.808 0.016 -1.153 0.02 -0.235 0.002 -0.47 0.005 -0.705 0.011 -0.19 0.004 -0.379 0.007 -0.569 0.008q-0.108 0.001 -0.217 0.004c-0.554 0.016 -0.554 0.016 -0.695 -0.084 -0.104 -0.107 -0.163 -0.229 -0.223 -0.365l-0.063 -0.063c-0.007 -0.088 -0.007 -0.088 -0.007 -0.202v-0.064c0 -0.068 0.001 -0.137 0.001 -0.205l0 -0.126c0 -0.156 0.001 -0.313 0.002 -0.469z" fill="#F96C50"/><path d="M7.366 4.842c0.188 0.011 0.376 0.016 0.564 0.021 0.284 0.009 0.567 0.027 0.851 0.043v2.063h-3.094l-0.031 -0.625c-0.077 -0.168 -0.077 -0.168 -0.193 -0.277L5.375 6c0.418 -1.062 0.876 -1.233 1.991 -1.158" fill="#68D5F3"/><path d="M9.281 7.469h2.594v1.594l-0.375 0.094c-0.411 0.169 -0.701 0.441 -0.938 0.813l-0.063 0.094h-1.219z" fill="#F86C4F"/><path d="M4.453 9.673C4.804 9.879 5.048 10.162 5.156 10.563c0.045 0.427 -0.045 0.779 -0.287 1.131 -0.308 0.308 -0.617 0.426 -1.047 0.443 -0.349 -0.003 -0.635 -0.148 -0.885 -0.387 -0.31 -0.339 -0.368 -0.708 -0.349 -1.152 0.025 -0.307 0.234 -0.56 0.453 -0.762 0.392 -0.319 0.957 -0.39 1.412 -0.163" fill="#939CA7"/><path d="M12.827 9.737c0.284 0.208 0.468 0.459 0.58 0.794 0.028 0.455 -0.015 0.822 -0.313 1.188 -0.15 0.162 -0.331 0.255 -0.531 0.344l-0.073 0.035c-0.108 0.036 -0.211 0.038 -0.324 0.037l-0.067 -0.001c-0.353 -0.008 -0.607 -0.132 -0.87 -0.365 -0.299 -0.339 -0.4 -0.639 -0.395 -1.093 0.034 -0.361 0.248 -0.662 0.52 -0.889 0.427 -0.306 1.024 -0.34 1.473 -0.05" fill="#939CA7"/><path d="M9.281 4.906c0.892 -0.143 0.892 -0.143 1.188 0 0.343 0.272 0.553 0.722 0.756 1.101 0.164 0.307 0.356 0.592 0.554 0.878C11.813 6.938 11.813 6.938 11.813 6.969h-2.531z" fill="#68D4F2"/><path d="M5.656 10.594h4.688v0.5H5.656z" fill="#CBD0D8"/><path d="M12.36 10.085c0.245 0.103 0.406 0.243 0.518 0.486 0.07 0.208 0.055 0.394 -0.034 0.594 -0.113 0.202 -0.276 0.36 -0.5 0.43 -0.219 0.026 -0.437 0.041 -0.629 -0.082 -0.065 -0.052 -0.065 -0.052 -0.121 -0.105l-0.048 -0.044c-0.146 -0.154 -0.191 -0.343 -0.217 -0.547 0.008 -0.201 0.121 -0.378 0.246 -0.529 0.239 -0.194 0.479 -0.288 0.786 -0.2" fill="#020203"/><path d="M4.199 10.131c0.119 0.067 0.214 0.137 0.301 0.244l0.072 0.088c0.1 0.188 0.079 0.426 0.053 0.631 -0.087 0.23 -0.284 0.392 -0.5 0.5 -0.51 0.041 -0.51 0.041 -0.7 -0.108 -0.198 -0.191 -0.332 -0.367 -0.347 -0.652 0.007 -0.215 0.081 -0.388 0.223 -0.548 0.258 -0.237 0.577 -0.307 0.898 -0.155" fill="#020202"/><path d="M13.938 10.594h1.531v0.5h-1.531z" fill="#CCD1D9"/><path d="M0.531 10.594h1.531v0.5H0.531z" fill="#CCD1D9"/><path d="M7.219 8h1.031v0.531h-1.031z" fill="#080302"/><path d="M14.969 8.531h0.5v0.5h-0.5z" fill="#FCD770"/><path d="M0.531 8.531h0.5v0.5H0.531z" fill="#FCD770"/><path d="M4.656 6.469h0.5v0.5h-0.5z" fill="#AAB2BD"/><path d="M12.25 10.594c0.078 0.049 0.078 0.049 0.125 0.125 0.018 0.107 0.018 0.107 0 0.219 -0.076 0.106 -0.122 0.149 -0.25 0.176 -0.128 -0.027 -0.174 -0.07 -0.25 -0.176 -0.02 -0.124 -0.019 -0.188 0.047 -0.295 0.11 -0.069 0.202 -0.074 0.328 -0.049" fill="#C7CBD3"/><path d="M4 10.594c0.078 0.049 0.078 0.049 0.125 0.125 0.018 0.107 0.018 0.107 0 0.219 -0.076 0.106 -0.122 0.149 -0.25 0.176 -0.128 -0.027 -0.174 -0.07 -0.25 -0.176 -0.02 -0.124 -0.019 -0.188 0.047 -0.295 0.11 -0.069 0.202 -0.074 0.328 -0.049" fill="#C7CBD3"/></svg>',

  [eDescription.DRINK]:
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="M14.75 0.07c0.092 0.173 0.087 0.299 0.063 0.492 -0.138 0.18 -0.278 0.23 -0.492 0.29l-0.185 0.053 -0.198 0.055 -0.202 0.057C12.026 1.5 12.026 1.5 11.813 1.5l-0.021 0.125c-0.075 0.439 -0.179 0.865 -0.3 1.293l-0.052 0.189Q11.377 3.335 11.313 3.563l0.115 0.002q0.592 0.008 1.183 0.018a148.688 148.688 0 0 0 0.442 0.007c0.211 0.003 0.423 0.006 0.634 0.01l0.2 0.002 0.186 0.004 0.164 0.003C14.375 3.625 14.375 3.625 14.563 3.75c0.066 0.257 0.065 0.49 0.044 0.752l-0.017 0.225 -0.02 0.244q-0.01 0.13 -0.02 0.259 -0.027 0.351 -0.055 0.702c-0.02 0.246 -0.039 0.491 -0.058 0.737a910.438 910.438 0 0 1 -0.098 1.238q-0.069 0.87 -0.137 1.74a2296.5 2296.5 0 0 1 -0.213 2.708 132.188 132.188 0 0 1 -0.036 0.441q-0.016 0.202 -0.029 0.404l-0.013 0.186 -0.01 0.162c-0.041 0.224 -0.156 0.326 -0.338 0.451h-0.188v0.313l0.121 0.035C13.625 14.438 13.625 14.438 13.695 14.629c-0.013 0.395 -0.224 0.642 -0.49 0.921 -0.429 0.392 -0.828 0.478 -1.394 0.475l-0.186 0.001c-0.202 0.001 -0.404 0.001 -0.606 0.001q-0.211 0 -0.423 0.001 -0.443 0.001 -0.885 0c-0.377 -0.001 -0.755 0.001 -1.132 0.002 -0.291 0.001 -0.582 0.001 -0.873 0.001q-0.209 0 -0.417 0.001a56.875 56.875 0 0 1 -0.585 -0.001l-0.172 0.002c-0.521 -0.006 -0.983 -0.178 -1.368 -0.538 -0.324 -0.383 -0.486 -0.807 -0.542 -1.302l-0.015 -0.129c-0.072 -0.652 -0.117 -1.306 -0.166 -1.96l-0.033 -0.433q-0.043 -0.565 -0.086 -1.129 -0.044 -0.578 -0.088 -1.157Q4.148 8.256 4.063 7.125l-0.143 -0.025 -0.188 -0.033 -0.186 -0.033c-0.729 -0.143 -1.343 -0.55 -1.784 -1.143 -0.523 -0.8 -0.705 -1.673 -0.534 -2.612 0.247 -0.88 0.759 -1.559 1.55 -2.01 0.484 -0.243 0.96 -0.339 1.5 -0.342l0.242 -0.003c0.292 0.018 0.52 0.054 0.731 0.264 0.008 0.164 0.008 0.164 0 0.313 0.407 0.149 0.407 0.149 0.832 0.164 0.289 0.029 0.373 0.114 0.562 0.324C7.019 2.471 7.313 3.001 7.313 3.625h3.125l0.125 -0.688c0.064 -0.28 0.136 -0.558 0.209 -0.836 0.033 -0.126 0.065 -0.252 0.097 -0.379q0.032 -0.122 0.064 -0.244l0.057 -0.22C11.073 1.034 11.134 0.913 11.313 0.75c0.202 -0.088 0.409 -0.141 0.622 -0.195l0.184 -0.049a47.625 47.625 0 0 1 0.386 -0.1 55 55 0 0 0 0.588 -0.155q0.188 -0.049 0.376 -0.098l0.176 -0.047c0.806 -0.204 0.806 -0.204 1.104 -0.036" fill="#010103"/><path d="m13.5 8.563 -0.012 0.152q-0.056 0.715 -0.11 1.431 -0.028 0.368 -0.057 0.735 -0.028 0.356 -0.055 0.712 -0.01 0.135 -0.021 0.269c-0.039 0.491 -0.066 0.982 -0.074 1.475 -0.001 0.046 -0.003 0.091 -0.004 0.139 -0.003 0.142 -0.003 0.142 0.02 0.337l0.188 0.125c0.012 0.195 0.012 0.195 0 0.375l-0.172 0.07c-0.236 0.136 -0.308 0.265 -0.453 0.492 -0.351 0.35 -0.642 0.385 -1.122 0.386l-0.173 0.001q-0.284 0.002 -0.569 0.003l-0.196 0.001q-0.514 0.002 -1.029 0.003c-0.354 0.001 -0.708 0.003 -1.062 0.005 -0.272 0.002 -0.545 0.002 -0.817 0.002q-0.196 0.001 -0.391 0.002c-0.183 0.002 -0.366 0.002 -0.548 0.001l-0.163 0.002c-0.427 -0.004 -0.695 -0.115 -1.007 -0.418 -0.287 -0.462 -0.334 -0.959 -0.37 -1.492l-0.016 -0.215q-0.017 -0.224 -0.032 -0.448c-0.016 -0.227 -0.032 -0.453 -0.049 -0.68q-0.016 -0.219 -0.032 -0.438l-0.015 -0.203c-0.03 -0.443 -0.039 -0.882 -0.033 -1.326 1.913 -0.559 1.913 -0.559 2.856 -0.754l0.185 -0.038c0.263 -0.052 0.503 -0.089 0.772 -0.083 -0.059 0.357 -0.127 0.704 -0.23 1.051 -0.072 0.255 -0.101 0.44 -0.02 0.699 0.07 0.083 0.07 0.083 0.246 0.074 0.198 0.009 0.198 0.009 0.316 -0.137a6 6 0 0 0 0.103 -0.375l0.057 -0.227 0.058 -0.238q0.057 -0.233 0.115 -0.465l0.051 -0.209C9.688 9.188 9.688 9.188 9.813 9c0.142 -0.041 0.142 -0.041 0.322 -0.066l0.203 -0.029 0.221 -0.029 0.226 -0.032C12.864 8.559 12.864 8.559 13.5 8.563" fill="#FD6C79"/><path d="M4.688 4.375h5.563c-0.184 0.781 -0.374 1.558 -0.579 2.334q-0.051 0.192 -0.1 0.384c-0.049 0.187 -0.098 0.374 -0.147 0.561l-0.044 0.173 -0.043 0.16 -0.037 0.14c-0.057 0.142 -0.119 0.214 -0.237 0.31 -0.169 0.048 -0.169 0.048 -0.376 0.083l-0.234 0.042 -0.125 0.021c-0.843 0.145 -1.664 0.339 -2.487 0.57l-0.224 0.063c-0.065 0.019 -0.13 0.037 -0.197 0.056C5.25 9.313 5.25 9.313 5 9.313q-0.061 -0.841 -0.122 -1.682 -0.028 -0.391 -0.057 -0.781a571.125 571.125 0 0 1 -0.055 -0.755q-0.01 -0.143 -0.021 -0.287a175.188 175.188 0 0 1 -0.029 -0.404l-0.017 -0.232C4.686 4.906 4.688 4.64 4.688 4.375" fill="#C9EFFA"/><path d="M11 4.375h2.813c-0.075 1.147 -0.154 2.292 -0.25 3.438a392.625 392.625 0 0 1 -2.238 0.289l-0.184 0.023A39.688 39.688 0 0 1 10 8.25c0.081 -0.493 0.194 -0.971 0.329 -1.452l0.058 -0.211c0.061 -0.22 0.122 -0.441 0.183 -0.661l0.125 -0.451c0.101 -0.367 0.203 -0.733 0.305 -1.099" fill="#C8EEF9"/><path d="M5.188 1.5c0.247 0.035 0.417 0.113 0.625 0.25 -0.083 0.392 -0.316 0.599 -0.594 0.867l-0.131 0.13C4.768 3.063 4.768 3.063 4.625 3.063V1.75l0.438 -0.063z" fill="#F7E06F"/><path d="M4 4.875c0.042 0.48 0.072 0.955 0.063 1.438 -0.435 -0.024 -0.746 -0.165 -1.125 -0.375 0.082 -0.181 0.17 -0.311 0.311 -0.452l0.108 -0.109L3.469 5.266l0.113 -0.114 0.108 -0.108 0.099 -0.098C3.875 4.875 3.875 4.875 4 4.875" fill="#F0D96C"/><path d="M2 4.375h1.313c-0.1 0.201 -0.151 0.291 -0.301 0.439l-0.101 0.1 -0.105 0.102 -0.107 0.105A67.375 67.375 0 0 1 2.438 5.375c-0.17 -0.148 -0.243 -0.291 -0.324 -0.5l-0.065 -0.164C2 4.563 2 4.563 2 4.375" fill="#F4DD6E"/><path d="M6.188 2.688c0.053 0.097 0.105 0.195 0.156 0.293l0.088 0.165C6.5 3.313 6.5 3.313 6.5 3.625H5.188c0.433 -0.505 0.433 -0.505 0.641 -0.715l0.126 -0.129C6.063 2.688 6.063 2.688 6.188 2.688" fill="#F5DE6E"/><path d="M2.375 2.688c0.329 0.275 0.647 0.559 0.938 0.875v0.063H2c0.07 -0.423 0.07 -0.423 0.188 -0.644l0.066 -0.128C2.313 2.75 2.313 2.75 2.375 2.688" fill="#FBE471"/><path d="M3.875 1.75v1.313c-0.492 -0.422 -0.492 -0.422 -0.715 -0.648l-0.129 -0.13L2.938 2.188c0.158 -0.171 0.283 -0.283 0.504 -0.359l0.127 -0.046C3.688 1.75 3.688 1.75 3.875 1.75" fill="#FCE471"/></svg>',
  [eDescription.OTHERS]:
    '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"><path d="m13.781 6.125 0.083 0.034c0.53 0.241 0.864 0.686 1.079 1.211 0.157 0.509 0.092 1.114 -0.146 1.583 -0.258 0.476 -0.662 0.801 -1.172 0.984 -0.544 0.158 -1.144 0.095 -1.638 -0.173 -0.519 -0.3 -0.808 -0.757 -0.973 -1.323 -0.116 -0.542 0.006 -1.108 0.292 -1.572 0.292 -0.438 0.756 -0.749 1.272 -0.857 0.398 -0.063 0.832 -0.051 1.204 0.113m-1.531 1.213a2.406 2.406 0 0 0 -0.094 0.131l-0.041 0.061c-0.119 0.217 -0.122 0.48 -0.084 0.72 0.088 0.285 0.25 0.485 0.506 0.634 0.264 0.13 0.527 0.147 0.806 0.054 0.265 -0.123 0.449 -0.284 0.574 -0.549a1.145 1.145 0 0 0 0 -0.777c-0.126 -0.267 -0.31 -0.419 -0.574 -0.549 -0.389 -0.133 -0.815 -0.019 -1.094 0.275" fill="#006970"/><path d="m8.781 6.125 0.083 0.034c0.53 0.241 0.864 0.686 1.079 1.211 0.157 0.509 0.092 1.114 -0.146 1.583 -0.258 0.476 -0.662 0.801 -1.172 0.984 -0.544 0.158 -1.144 0.095 -1.638 -0.173 -0.519 -0.3 -0.808 -0.757 -0.973 -1.323 -0.116 -0.542 0.006 -1.108 0.292 -1.572 0.292 -0.438 0.756 -0.749 1.272 -0.857 0.398 -0.063 0.832 -0.051 1.204 0.113m-1.531 1.213a2.406 2.406 0 0 0 -0.094 0.131l-0.041 0.061c-0.119 0.217 -0.122 0.48 -0.084 0.72 0.088 0.285 0.25 0.485 0.506 0.634 0.264 0.13 0.527 0.147 0.806 0.054 0.265 -0.123 0.449 -0.284 0.574 -0.549a1.145 1.145 0 0 0 0 -0.777c-0.126 -0.267 -0.31 -0.419 -0.574 -0.549 -0.389 -0.133 -0.815 -0.019 -1.094 0.275" fill="#018591"/><path d="m3.781 6.125 0.083 0.034c0.53 0.241 0.864 0.686 1.079 1.211 0.157 0.509 0.092 1.114 -0.146 1.583 -0.258 0.476 -0.662 0.801 -1.172 0.984 -0.544 0.158 -1.144 0.095 -1.638 -0.173 -0.519 -0.3 -0.808 -0.757 -0.973 -1.323 -0.116 -0.542 0.006 -1.108 0.292 -1.572 0.292 -0.438 0.756 -0.749 1.272 -0.857 0.398 -0.063 0.832 -0.051 1.204 0.113m-1.531 1.213A2.406 2.406 0 0 0 2.156 7.469l-0.041 0.061C1.996 7.746 1.993 8.01 2.031 8.25c0.088 0.285 0.25 0.485 0.506 0.634 0.264 0.13 0.527 0.147 0.806 0.054 0.265 -0.123 0.449 -0.284 0.574 -0.549a1.145 1.145 0 0 0 0 -0.777c-0.126 -0.267 -0.31 -0.419 -0.574 -0.549 -0.389 -0.133 -0.815 -0.019 -1.094 0.275" fill="#01A0B2"/></svg>',
};
