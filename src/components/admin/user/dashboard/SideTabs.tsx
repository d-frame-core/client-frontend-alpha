import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import DftGrowth from './DfrGrowthSecond';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function DftStat() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 370 }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider' }}
      >
        <Tab label="Dft Value" {...a11yProps(0)} />
        <Tab label="User Frowth" {...a11yProps(1)} />
        <Tab label="Dft Usage" {...a11yProps(2)} />
        <Tab label="Users Screen Time" {...a11yProps(3)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <DftGrowth />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DftGrowth />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DftGrowth />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DftGrowth />
      </TabPanel>
      <TabPanel value={value} index={4}>
        <DftGrowth />
      </TabPanel>
      <TabPanel value={value} index={5}>
        <DftGrowth />
      </TabPanel>
      <TabPanel value={value} index={6}>
        <DftGrowth />
      </TabPanel>
    </Box>
  );
}