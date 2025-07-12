# -*- coding: utf-8 -*-
# from odoo import http


# class SkillSwapBackend(http.Controller):
#     @http.route('/skill_swap_backend/skill_swap_backend', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/skill_swap_backend/skill_swap_backend/objects', auth='public')
#     def list(self, **kw):
#         return http.request.render('skill_swap_backend.listing', {
#             'root': '/skill_swap_backend/skill_swap_backend',
#             'objects': http.request.env['skill_swap_backend.skill_swap_backend'].search([]),
#         })

#     @http.route('/skill_swap_backend/skill_swap_backend/objects/<model("skill_swap_backend.skill_swap_backend"):obj>', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('skill_swap_backend.object', {
#             'object': obj
#         })
