from odoo import http
from odoo.http import request, Response
import json

class SkillSwapAPI(http.Controller):

    @http.route('/api/profiles', auth='public', type='json', methods=['GET'])
    def get_profiles(self):
        profiles = request.env['skill.swap.user'].sudo().search([('is_public', '=', True)])
        result = [{
            'id': p.id,
            'name': p.name,
            'skillsOffered': p.skills_offered.split(',') if p.skills_offered else [],
            'skillsWanted': p.skills_wanted.split(',') if p.skills_wanted else [],
            'availability': p.availability,
            'rating': p.rating,
        } for p in profiles]
        return result
