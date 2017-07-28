let globalValue;
function setValue(val) {
    globalValue=val;
}
function showValue() {
    console.log(global);
    return globalValue;
}
process.stdin.resume();
console.log(process);
process.stdin.on('data',function (chunk) {
    process.stdout.write('data:'+chunk);
});
exports.setValue=setValue;
exports.showValue=showValue;