/**
 * Created by Administrator on 2017/5/8.
 */
fis.set('new date', Date.now());
fis.hook('relative');
fis.match('engineCar/**.*', {
    relative: true,
    useHash: false,
    release:'/dist/$0',
    query: '?=t' + fis.get('new date')
});
