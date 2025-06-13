import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import FormComponent from '../components/FormComponent';
import {
  AccountBalance as AccountBalanceIcon,
  Security as SecurityIcon,
  Timeline as TimelineIcon,
} from '@mui/icons-material';

function HomePage() {
  const features = [
    {
      icon: <AccountBalanceIcon fontSize="large" color="primary" />,
      title: 'Smart Financial Planning',
      description: 'Get personalized recommendations based on your financial goals and current situation.',
    },
    {
      icon: <SecurityIcon fontSize="large" color="primary" />,
      title: 'Risk Assessment',
      description: 'Understand and manage your risk tolerance with our advanced analysis.',
    },
    {
      icon: <TimelineIcon fontSize="large" color="primary" />,
      title: 'Goal Tracking',
      description: 'Track your progress and adjust your strategy with our interactive tools.',
    },
  ];

  return (
    <Container maxWidth="lg">
      <Box sx={{ py: 4 }}>
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          align="center"
          sx={{ fontWeight: 'bold', mb: 4 }}
        >
          Financial Planning Assistant
        </Typography>
        
        <Typography
          variant="h6"
          align="center"
          color="text.secondary"
          paragraph
          sx={{ mb: 6 }}
        >
          Make informed decisions about your financial future with our AI-powered recommendations
        </Typography>

        {/* Features Section */}
        <Grid container spacing={4} sx={{ mb: 6 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  bgcolor: 'background.default',
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Form Section */}
        <Box sx={{ maxWidth: 800, mx: 'auto' }}>
          <FormComponent />
        </Box>
      </Box>
    </Container>
  );
}

export default HomePage;
