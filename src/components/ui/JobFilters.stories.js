import React from 'react';
import { storiesOf } from '@storybook/react';

import JobFilters from './JobFilters';

storiesOf('JobFilters', module).add('default', () => (
  <JobFilters includeRemote={true} toggleRemote={() => {}} />
));
