import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { postLeaveRequest } from '../../redux/actions/leaveAction';
import axios from 'axios';

const LeaveRequestForm = ({ postLeaveRequest }) => {
  

  return (
   <>  </>
  );
};

export default connect(null, { postLeaveRequest })(LeaveRequestForm);
