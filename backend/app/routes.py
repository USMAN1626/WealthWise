from flask import Blueprint, request, jsonify
import os

routes = Blueprint('routes', __name__)

def infer_recommendation(income, expenses, savings, goal_cost, time_frame, risk_level):
    saving_ratio = savings / expenses if expenses else 0
    monthly_saving_needed = goal_cost / time_frame
    surplus = income - expenses
    monthly_surplus_ratio = surplus / monthly_saving_needed if monthly_saving_needed else float('inf')
    emergency_fund_months = savings / expenses if expenses else 0
    debt_capacity = income * 0.4  
    if savings >= goal_cost:
        return "Goal Achievable Now - Consider immediate action while maintaining emergency fund"
    
    elif emergency_fund_months < 3:
        return "Build Emergency Fund First - Aim for 3-6 months of expenses before major goals"
    
    elif surplus <= 0:
        return "Critical Budget Review Needed - Focus on reducing expenses or increasing income"
    
    elif risk_level == "high":
        if monthly_surplus_ratio >= 1.2:
            return "Aggressive Investment Strategy - Consider high-growth stocks and ETFs with surplus"
        elif monthly_surplus_ratio >= 0.8:
            return "Balanced Aggressive Approach - Mix of investments and accelerated savings"
        else:
            return "Income Growth Focus - Look for additional income sources while maintaining aggressive investment"
    
    elif risk_level == "medium":
        if monthly_surplus_ratio >= 1.5:
            return "Optimal Balanced Strategy - Mix savings and moderate-risk investments"
        elif monthly_surplus_ratio >= 1.0:
            return "Steady Progress - Maintain current savings with balanced investment portfolio"
        else:
            return "Budget Optimization Needed - Review expenses while maintaining balanced investments"
    
    elif risk_level == "low":
        if monthly_surplus_ratio >= 2.0:
            return "Conservative Success Path - Focus on secure investments and high-yield savings"
        elif monthly_surplus_ratio >= 1.2:
            return "Safe Progress - Maintain conservative investment approach with steady savings"
        else:
            return "Extended Timeline Recommended - Consider longer time frame or adjust goal"

    if saving_ratio > 0.7:
        return "Excellent Saving Habits - Consider slight risk increase for better returns"
    elif time_frame < 12 and goal_cost > income * 0.5:
        return "Timeline Adjustment Needed - Short-term goal may need longer horizon"
    
    return "Custom Financial Advice Recommended - Consider consulting a financial advisor"




@routes.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        income = float(data['income'])
        expenses = float(data['expenses'])
        savings = float(data['savings'])
        goal_cost = float(data['goal_cost'])
        time_frame = int(data['time_frame'])
        risk_level = data.get('risk_level', 'mid').lower()

        recommendation = infer_recommendation(income, expenses, savings, goal_cost, time_frame, risk_level)

        return jsonify({
            'status': 'success',
            'recommendation': recommendation
        })
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)})
