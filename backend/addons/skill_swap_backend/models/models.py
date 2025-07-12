# -*- coding: utf-8 -*-

# from odoo import models, fields, api


# class skill_swap_backend(models.Model):
#     _name = 'skill_swap_backend.skill_swap_backend'
#     _description = 'skill_swap_backend.skill_swap_backend'

#     name = fields.Char()
#     value = fields.Integer()
#     value2 = fields.Float(compute="_value_pc", store=True)
#     description = fields.Text()
#
#     @api.depends('value')
#     def _value_pc(self):
#         for record in self:
#             record.value2 = float(record.value) / 100
