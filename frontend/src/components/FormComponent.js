import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  Tooltip,
  Stepper,
  Step,
  StepLabel,
  Box,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

function FormComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    income: "",
    expenses: "",
    savings: "",
    goal_cost: "",
    time_frame: "",
    risk_level: "mid",
    goal_type: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 0) {
      if (!formData.income || formData.income <= 0) {
        newErrors.income = "Income must be greater than 0";
      } else if (formData.income > 1000000) {
        newErrors.income = "Income seems unrealistically high";
      } else if (formData.income < 1000) {
        newErrors.income = "Income seems unrealistically low";
      }

      if (!formData.expenses || formData.expenses < 0) {
        newErrors.expenses = "Expenses cannot be negative";
      } else if (Number(formData.expenses) > Number(formData.income)) {
        newErrors.expenses = "Expenses cannot be greater than income";
      } else if (formData.expenses < 100) {
        newErrors.expenses = "Expenses seem unrealistically low";
      }

      if (!formData.savings || formData.savings < 0) {
        newErrors.savings = "Savings cannot be negative";
      } else if (formData.savings > formData.income * 12) {
        newErrors.savings = "Savings seem unrealistically high";
      }
    } else if (step === 1) {
      if (!formData.goal_type) {
        newErrors.goal_type = "Please select a goal type";
      }

      if (!formData.goal_cost || formData.goal_cost <= 0) {
        newErrors.goal_cost = "Goal cost must be greater than 0";
      } else {
        switch (formData.goal_type) {
          case "Buy a car":
            if (formData.goal_cost < 5000) newErrors.goal_cost = "Car cost seems unrealistically low";
            else if (formData.goal_cost > 200000) newErrors.goal_cost = "Car cost seems unrealistically high";
            break;
          case "Buy a house":
            if (formData.goal_cost < 50000) newErrors.goal_cost = "House cost seems unrealistically low";
            else if (formData.goal_cost > 10000000) newErrors.goal_cost = "House cost seems unrealistically high";
            break;
          case "Travel abroad":
            if (formData.goal_cost < 1000) newErrors.goal_cost = "Travel cost seems unrealistically low";
            else if (formData.goal_cost > 100000) newErrors.goal_cost = "Travel cost seems unrealistically high";
            break;
          case "Start a business":
            if (formData.goal_cost < 1000) newErrors.goal_cost = "Business startup cost seems unrealistically low";
            else if (formData.goal_cost > 1000000) newErrors.goal_cost = "Business startup cost seems unrealistically high";
            break;
          case "Higher education":
            if (formData.goal_cost < 5000) newErrors.goal_cost = "Education cost seems unrealistically low";
            else if (formData.goal_cost > 500000) newErrors.goal_cost = "Education cost seems unrealistically high";
            break;
          case "Retirement saving":
            if (formData.goal_cost < 10000) newErrors.goal_cost = "Retirement goal seems unrealistically low";
            else if (formData.goal_cost > 10000000) newErrors.goal_cost = "Retirement goal seems unrealistically high";
            break;
          case "Emergency fund":
            if (formData.goal_cost < 1000) newErrors.goal_cost = "Emergency fund seems unrealistically low";
            else if (formData.goal_cost > formData.income * 12) newErrors.goal_cost = "Emergency fund seems unrealistically high";
            break;
          default:
            if (formData.goal_cost > formData.income * 100) newErrors.goal_cost = "Goal cost seems unrealistically high compared to income";
            break;
        }
      }

      if (!formData.time_frame || formData.time_frame <= 0) {
        newErrors.time_frame = "Time frame must be greater than 0";
      } else {
        switch (formData.goal_type) {
          case "Buy a car":
            if (formData.time_frame > 60) newErrors.time_frame = "5 years is a reasonable maximum for car purchase";
            break;
          case "Buy a house":
            if (formData.time_frame > 360) newErrors.time_frame = "30 years is a reasonable maximum for house purchase";
            break;
          case "Travel abroad":
            if (formData.time_frame > 24) newErrors.time_frame = "2 years is a reasonable maximum for travel planning";
            break;
          case "Start a business":
            if (formData.time_frame > 36) newErrors.time_frame = "3 years is a reasonable maximum for business startup";
            break;
          case "Higher education":
            if (formData.time_frame > 48) newErrors.time_frame = "4 years is a reasonable maximum for education savings";
            break;
          case "Retirement saving":
            if (formData.time_frame > 600) newErrors.time_frame = "50 years is a reasonable maximum for retirement planning";
            break;
          case "Emergency fund":
            if (formData.time_frame > 24) newErrors.time_frame = "2 years is a reasonable maximum for emergency fund";
            break;
          default:
            if (formData.time_frame > 600) newErrors.time_frame = "50 years is a reasonable maximum time frame";
            break;
        }
      }
    } else if (step === 2) {
      if (!formData.risk_level) {
        newErrors.risk_level = "Please select a risk level";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const steps = ["Basic Information", "Financial Goals", "Risk Assessment"];

  const handleNext = (e) => {
    e.preventDefault();
    if (validateStep(activeStep)) {
      if (activeStep === steps.length - 1) {
        const payload = {
          income: formData.income,
          expenses: formData.expenses,
          savings: formData.savings,
          goal_cost: formData.goal_cost,
          time_frame: formData.time_frame,
          risk_level: formData.risk_level,
        };
        navigate("/result", { state: { formData: payload } });
      } else {
        setActiveStep(prev => prev + 1);
      }
    }
  };

  const handleBack = () => setActiveStep(prev => prev - 1);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Tooltip title="Your monthly income after taxes" arrow>
                <TextField
                  fullWidth
                  label="Monthly Income"
                  name="income"
                  type="number"
                  value={formData.income}
                  onChange={handleChange}
                  required
                  error={!!errors.income}
                  helperText={errors.income}
                  InputProps={{ startAdornment: <Typography>$</Typography> }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip title="Your total monthly expenses" arrow>
                <TextField
                  fullWidth
                  label="Monthly Expenses"
                  name="expenses"
                  type="number"
                  value={formData.expenses}
                  onChange={handleChange}
                  required
                  error={!!errors.expenses}
                  helperText={errors.expenses}
                  InputProps={{ startAdornment: <Typography>$</Typography> }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12}>
              <Tooltip title="Your current total savings" arrow>
                <TextField
                  fullWidth
                  label="Current Savings"
                  name="savings"
                  type="number"
                  value={formData.savings}
                  onChange={handleChange}
                  required
                  error={!!errors.savings}
                  helperText={errors.savings}
                  InputProps={{ startAdornment: <Typography>$</Typography> }}
                />
              </Tooltip>
            </Grid>
          </Grid>
        );
      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel>What is your financial goal?</InputLabel>
                <Select
                  name="goal_type"
                  value={formData.goal_type}
                  onChange={handleChange}
                  label="What is your financial goal?"
                >
                  <MenuItem value="Buy a car">Buy a Car</MenuItem>
                  <MenuItem value="Travel abroad">Travel Abroad</MenuItem>
                  <MenuItem value="Start a business">Start a Business</MenuItem>
                  <MenuItem value="Buy a house">Buy a House</MenuItem>
                  <MenuItem value="Higher education">Higher Education</MenuItem>
                  <MenuItem value="Retirement saving">Retirement Saving</MenuItem>
                  <MenuItem value="Emergency fund">Emergency Fund</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip title="How much money do you need for your goal?" arrow>
                <TextField
                  fullWidth
                  label="Goal Cost"
                  name="goal_cost"
                  type="number"
                  value={formData.goal_cost}
                  onChange={handleChange}
                  required
                  error={!!errors.goal_cost}
                  helperText={errors.goal_cost}
                  InputProps={{ startAdornment: <Typography>$</Typography> }}
                />
              </Tooltip>
            </Grid>
            <Grid item xs={12} md={6}>
              <Tooltip title="Time frame in months to achieve your goal" arrow>
                <TextField
                  fullWidth
                  label="Time Frame (months)"
                  name="time_frame"
                  type="number"
                  value={formData.time_frame}
                  onChange={handleChange}
                  required
                  error={!!errors.time_frame}
                  helperText={errors.time_frame}
                />
              </Tooltip>
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box display="flex" alignItems="center" gap={1}>
                <FormControl fullWidth>
                  <InputLabel>Risk Level</InputLabel>
                  <Select
                    name="risk_level"
                    value={formData.risk_level}
                    onChange={handleChange}
                    label="Risk Level"
                  >
                    <MenuItem value="low">Low Risk</MenuItem>
                    <MenuItem value="mid">Medium Risk</MenuItem>
                    <MenuItem value="high">High Risk</MenuItem>
                  </Select>
                </FormControl>
                <Tooltip title="Choose your comfort level with investment risk" arrow>
                  <HelpOutlineIcon color="action" />
                </Tooltip>
              </Box>
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  return (
    <Card elevation={3}>
      <CardContent>
        <Typography variant="h5" gutterBottom align="center">
          Financial Planning Assistant
        </Typography>
        <Box sx={{ width: "100%", mb: 4 }}>
          <Stepper activeStep={activeStep}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <form onSubmit={handleNext}>
          {renderStepContent(activeStep)}
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
            >
              {activeStep === steps.length - 1 ? "Get Recommendation" : "Next"}
            </Button>
          </Box>
        </form>
      </CardContent>
    </Card>
  );
}

export default FormComponent;
