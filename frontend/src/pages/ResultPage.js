import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
  CircularProgress,
  Paper,
} from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from '@mui/lab';
import {
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';

function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecommendation = async () => {
      if (!location.state?.formData) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch('http://localhost:6969/predict', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(location.state.formData),
        });

        const data = await response.json();
        if (data.status === 'success') {
          setRecommendation(data.recommendation);
        } else {
          setError(data.message || 'Failed to get recommendation');
        }
      } catch (err) {
        setError('Failed to connect to the server');
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendation();
  }, [location.state, navigate]);

  const formData = location.state?.formData || {};

  const calculateProgress = () => {
    const totalNeeded = parseFloat(formData.goal_cost);
    const currentProgress = (parseFloat(formData.savings) / totalNeeded) * 100;
    return Math.min(Math.max(currentProgress, 0), 100);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <Card>
          <CardContent>
            <Typography color="error" gutterBottom>{error}</Typography>
            <Button variant="contained" onClick={() => navigate('/')}>Try Again</Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1200, margin: '0 auto' }}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>Your Financial Recommendation</Typography>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Goal Progress</Typography>
              <Box display="flex" justifyContent="center" alignItems="center" p={2}>
                <Box position="relative" display="inline-flex">
                  <CircularProgress variant="determinate" value={calculateProgress()} size={120} />
                  <Box position="absolute" top={0} left={0} bottom={0} right={0} display="flex" alignItems="center" justifyContent="center">
                    <Typography variant="h6" component="div" color="text.secondary">
                      {`${Math.round(calculateProgress())}%`}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Financial Summary</Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography color="textSecondary">Monthly Income</Typography>
                    <Typography variant="h6">${formData.income}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography color="textSecondary">Monthly Expenses</Typography>
                    <Typography variant="h6">${formData.expenses}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography color="textSecondary">Current Savings</Typography>
                    <Typography variant="h6">${formData.savings}</Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                    <Typography color="textSecondary">Goal Amount</Typography>
                    <Typography variant="h6">${formData.goal_cost}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>Recommended Action Plan</Typography>
              <Timeline position="alternate">
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary"><AssessmentIcon /></TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">Analysis</Typography>
                    <Typography>{recommendation}</Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary"><TrendingUpIcon /></TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">Timeline</Typography>
                    <Typography>Target completion: {formData.time_frame} months</Typography>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot color="primary"><AccountBalanceIcon /></TimelineDot>
                  </TimelineSeparator>
                  <TimelineContent>
                    <Typography variant="h6" component="span">Risk Level</Typography>
                    <Typography>
                      {formData.risk_level.charAt(0).toUpperCase() + formData.risk_level.slice(1)} risk tolerance
                    </Typography>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Box display="flex" justifyContent="center" mt={2}>
            <Button variant="contained" color="primary" onClick={() => navigate('/')} sx={{ mr: 2 }}>
              Start Over
            </Button>
            <Button variant="outlined" onClick={() => window.print()}>
              Print Report
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default ResultPage;
