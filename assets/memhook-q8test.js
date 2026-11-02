// Counts the memory this worker allocates: the WASM heap (CPU) and WebGPU buffers (GPU).
let heaps=[];let gpu=0,gpuPeak=0;const sizes=new WeakMap();
const OM=WebAssembly.Memory;WebAssembly.Memory=function(d){const m=new OM(d);heaps.push(m);return m};WebAssembly.Memory.prototype=OM.prototype;
for(const k of ["instantiate","instantiateStreaming"]){const f=WebAssembly[k];if(f)WebAssembly[k]=async(...a)=>{const r=await f.apply(WebAssembly,a);const ex=(r.instance||r).exports||{};for(const v of Object.values(ex))if(v instanceof OM&&!heaps.includes(v))heaps.push(v);return r}}
if(self.GPUDevice){const cb=GPUDevice.prototype.createBuffer;GPUDevice.prototype.createBuffer=function(d){const b=cb.call(this,d);sizes.set(b,d.size);gpu+=d.size;gpuPeak=Math.max(gpuPeak,gpu);return b};
const ds=GPUBuffer.prototype.destroy;GPUBuffer.prototype.destroy=function(){if(sizes.has(this)){gpu-=sizes.get(this);sizes.delete(this)}return ds.call(this)}}
if(self.GPUAdapter){const rd=GPUAdapter.prototype.requestDevice;GPUAdapter.prototype.requestDevice=async function(...a){const d=await rd.apply(this,a);d.lost.then(i=>{if(i.reason!=="destroyed")self.postMessage({gpulost:i.message||"lost"})});return d}}
globalThis.__doodleMemStats=()=>({heap:heaps.reduce((s,m)=>s+m.buffer.byteLength,0),gpu,gpuPeak});
