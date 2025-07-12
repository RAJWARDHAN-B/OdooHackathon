from odoo import models, fields

class SkillSwapUser(models.Model):
    _name = 'skill.swap.user'
    _description = 'Skill Swap User Profile'

    user_id = fields.Many2one('res.users', required=True)
    name = fields.Char()
    location = fields.Char()
    profile_photo = fields.Binary()
    skills_offered = fields.Char()
    skills_wanted = fields.Char()
    availability = fields.Char()
    is_public = fields.Boolean(default=True)
    rating = fields.Float()

class SwapRequest(models.Model):
    _name = 'skill.swap.request'
    _description = 'Swap Request'

    from_user_id = fields.Many2one('res.users', required=True)
    to_user_id = fields.Many2one('res.users', required=True)
    skill_offered = fields.Char()
    skill_wanted = fields.Char()
    message = fields.Text()
    status = fields.Selection([
        ('pending', 'Pending'),
        ('accepted', 'Accepted'),
        ('rejected', 'Rejected')
    ], default='pending')
