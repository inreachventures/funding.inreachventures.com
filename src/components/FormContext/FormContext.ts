import React from 'react';

import {Form} from '../../lib/form';

import {RemoteData} from '../../lib/remoteData';

type FormContext = RemoteData<string, Form>;

export default React.createContext<FormContext>({type: 'NotAsked'});
