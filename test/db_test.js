/**
 * Created by pupboss on 3/11/16.
 */

var model = require('../utility/db');

var user = {
  id: '1306030411',
  login_token: 'assadqwe',
  password: '1asdfdgsa',
  type: 'STUDENT',
  update_at: Date.now(),
  expires_at: Date.now(),
  create_at: Date.now(),
  user_agent: 'asdasdsada'
};

model.user_model.find({ id: '1306030411' }, function (error) {
  if(error){
    user.save();
    console.log('save');
  }else{
    model.user_model.update({ id: '1306030411' }, user, function (error, docs) {
      console.log(docs);
    });
  }
});
