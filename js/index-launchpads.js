/* ═══════════════════════════════════════
   LAUNCHPAD DATA
═══════════════════════════════════════ */
window.LAUNCHPADS = {

  masterclass: {
    label: 'Masterclass Launchpad',
    icon: '🎓',
    color: '#7c3aed',
    sections: {

      'event-details': {
        label: 'Event Details',
        steps: [
          { label: 'General Overview', fields: [
            { key:'mc_event_name_long',  name:'Event Name Long',  ghl:'mc_01_event_details__01__event_name_long__ex_12_day_atomic_offer_masterclass',  type:'text', aiHint:'Full event title. Ex: 1/2 Day Cold To Clients Masterclass' },
            { key:'mc_event_length',     name:'Event Length',     ghl:'mc_01_event_details__02__event_length__ex_12_day',     type:'text', aiHint:'Length prefix only. Ex: 1/2 Day' },
            { key:'mc_event_name_only',  name:'Event Name Only',  ghl:'mc_01_event_details__03__event_name_only__ex_atomic_offer',  type:'text', aiHint:'Name without length or type. Ex: Cold To Clients' },
            { key:'mc_event_type_only',  name:'Event Type Only',  ghl:'mc_01_event_details__04__event_type_only__ex_masterclass',  type:'text', aiHint:'Event type only. Ex: Masterclass' },
            { key:'mc_vip_offered',      name:'VIP Offered (Yes / No)', ghl:'mc_01_event_details__0702__vip_offered__ex_yes__no', type:'dropdown', options:['Yes','No'], aiHint:'Will you offer a VIP upgrade at this event?' },
          ]},
          { label: 'Event Date & Time', fields: [
            { key:'mc_event_day',        name:'Event Day',        ghl:'mc_01_event_details__05__event_day__ex_monday',        type:'dropdown', options:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], aiHint:'Day of the week the event takes place. Ex: Monday' },
            { key:'mc_event_date',       name:'Event Date',       ghl:'mc_01_event_details__06__event_date__ex_jan_1',       type:'text', aiHint:'Display date. Ex: Oct 6th' },
            { key:'mc_event_time',       name:'Event Time – General Session', ghl:'mc_01_event_details__07__event_time__ex_1pm_est', type:'text', aiHint:'Display time with timezone. Ex: 11am EST' },
            { key:'mc_event_day_time_fmt', name:'Event Day Time Formatted (**IMPORTANT – MATCHES TIMEZONE IN YOUR BUSINESS PROFILE – U.S. FORMAT: MM-DD-YYYY | 12HR)', ghl:'mc_01_event_details__08__event_day_time_formatted__ex_01012024_100_pm', type:'text', aiHint:'GHL timestamp format. Ex: 10-06-2025 11:00 AM' },
          ]},
          { label: 'VIP Event Time', note: '(*Only required if VIP Offered = Yes)', fields: [
            { key:'mc_vip_event_time',     name:'VIP Event Time',  ghl:'mc_01_event_details__0701__vip_event_time__ex_12pm_est', type:'text', aiHint:'VIP session display time. Ex: 12pm EST' },
            { key:'mc_vip_event_time_fmt', name:'VIP Event Time Formatted (**IMPORTANT – MATCHES TIMEZONE IN YOUR BUSINESS PROFILE – U.S. FORMAT: MM-DD-YYYY | 12HR)', ghl:'mc_01_event_details__0801__vip_event_time_formatted__ex_01012024_1200_pm', type:'text', aiHint:'GHL timestamp format. Ex: 10-06-2025 12:00 PM' },
          ]},
          { label: 'Session 1', fields: [
            { key:'mc_s1_title',  name:'Session 1 Title',          ghl:'mc_01_event_details__09__session_1_title__ex_the_turning_point',          type:'text', aiHint:'Ex: The Turning Point' },
            { key:'mc_s1_theme',  name:'Session 1 Theme',          ghl:'mc_01_event_details__10__session_1_theme__ex_discover_the_painful_problem_this_system_was_built_to_solve_and_how_most_coaches_stay_stuck_trying_to_ducttape_their_way_to_highticket_success',          type:'textarea', aiHint:'1–2 sentence theme. Ex: Discover the painful problem this system was built to solve and how most coaches stay stuck trying to duct-tape their way to high-ticket success.' },
            { key:'mc_s1_b1',     name:'Session 1 Breakthrough #01', ghl:'mc_01_event_details__11__session_1_breakthrough_01__ex_realize_why_most_offers_never_scale_past_wordofmouth', type:'text', aiHint:'Ex: Realize why most offers never scale past word-of-mouth' },
            { key:'mc_s1_b2',     name:'Session 1 Breakthrough #02', ghl:'mc_01_event_details__12__session_1_breakthrough_02__ex_see_how_this_system_was_born_from_hitting_rock_bottom', type:'text', aiHint:'Ex: See how this system was born from hitting rock bottom' },
            { key:'mc_s1_b3',     name:'Session 1 Breakthrough #03', ghl:'mc_01_event_details__13__session_1_breakthrough_03__ex_identify_the_real_reason_youre_not_getting_highticket_clients', type:'text', aiHint:'Ex: Identify the real reason you\'re not getting high-ticket clients' },
            { key:'mc_s1_b4',     name:'Session 1 Breakthrough #04', ghl:'mc_01_event_details__14__session_1_breakthrough_04__ex_understand_what_separates_successful_coaches_from_burntout_ones', type:'text', aiHint:'Ex: Understand what separates successful coaches from burnt-out ones' },
          ]},
          { label: 'Session 2', fields: [
            { key:'mc_s2_title',  name:'Session 2 Title',          ghl:'mc_01_event_details__15__session_2_title__ex_the_atomic_offer_system',          type:'text', aiHint:'Ex: The Atomic Offer System' },
            { key:'mc_s2_theme',  name:'Session 2 Theme',          ghl:'mc_01_event_details__16__session_2_theme__ex_unveil_the_full_5step_framework_that_turns_your_knowledge_into_a_highconverting_scalable_offer_using_a_single_virtual_event',          type:'textarea', aiHint:'Ex: Unveil the full 5-step framework that turns your knowledge into a high-converting, scalable offer using a single virtual event.' },
            { key:'mc_s2_b1',     name:'Session 2 Breakthrough #01', ghl:'mc_01_event_details__17__session_2_breakthrough_01__ex_learn_how_to_craft_a_premium_offer_that_sells_itself', type:'text', aiHint:'Ex: Learn how to craft a premium offer that sells itself' },
            { key:'mc_s2_b2',     name:'Session 2 Breakthrough #02', ghl:'mc_01_event_details__18__session_2_breakthrough_02__ex_discover_how_to_position_yourself_as_the_obvious_choice', type:'text', aiHint:'Ex: Discover how to position yourself as the obvious choice' },
            { key:'mc_s2_b3',     name:'Session 2 Breakthrough #03', ghl:'mc_01_event_details__19__session_2_breakthrough_03__ex_understand_the_full_system_without_the_tech_overwhelm', type:'text', aiHint:'Ex: Understand the full system without the tech overwhelm' },
            { key:'mc_s2_b4',     name:'Session 2 Breakthrough #04', ghl:'mc_01_event_details__20__session_2_breakthrough_04__ex_see_how_one_event_can_unlock_consistent_income', type:'text', aiHint:'Ex: See how one event can unlock consistent income' },
          ]},
          { label: 'Session 3', fields: [
            { key:'mc_s3_title',  name:'Session 3 Title',          ghl:'mc_01_event_details__21__session_3_title__ex_clearing_the_inner_blocks',          type:'text', aiHint:'Ex: Clearing the Inner Blocks' },
            { key:'mc_s3_theme',  name:'Session 3 Theme',          ghl:'mc_01_event_details__22__session_3_theme__ex_address_the_internal_beliefs_fears_and_doubts_that_keep_coaches_from_stepping_into_a_higher_level_of_success',          type:'textarea', aiHint:'Ex: Address the internal beliefs, fears, and doubts that keep coaches from stepping into a higher level of success.' },
            { key:'mc_s3_b1',     name:'Session 3 Breakthrough #01', ghl:'mc_01_event_details__23__session_3_breakthrough_01__ex_dismantle_the_belief_that_you_need_to_deserve_highticket_success', type:'text', aiHint:'Ex: Dismantle the belief that you need to "deserve" high-ticket success' },
            { key:'mc_s3_b2',     name:'Session 3 Breakthrough #02', ghl:'mc_01_event_details__24__session_3_breakthrough_02__ex_replace_fear_of_selling_with_excitement_to_serve', type:'text', aiHint:'Ex: Replace fear of selling with excitement to serve' },
            { key:'mc_s3_b3',     name:'Session 3 Breakthrough #03', ghl:'mc_01_event_details__25__session_3_breakthrough_03__ex_drop_the_idea_that_youre_not_ready_or_expert_enough', type:'text', aiHint:'Ex: Drop the idea that you\'re not ready or expert enough' },
            { key:'mc_s3_b4',     name:'Session 3 Breakthrough #04', ghl:'mc_01_event_details__26__session_3_breakthrough_04__ex_build_unshakable_confidence_in_your_unique_value', type:'text', aiHint:'Ex: Build unshakable confidence in your unique value' },
          ]},
          { label: 'Session 4', fields: [
            { key:'mc_s4_title',  name:'Session 4 Title',          ghl:'mc_01_event_details__27__session_4_title__ex_handling_the_external_noise',          type:'text', aiHint:'Ex: Handling the External Noise' },
            { key:'mc_s4_theme',  name:'Session 4 Theme',          ghl:'mc_01_event_details__28__session_4_theme__ex_overcome_the_outside_excuses_and_circumstances_that_keep_you_stuck__from_audience_size_to_budget_to_time',          type:'textarea', aiHint:'Ex: Overcome the outside excuses and circumstances that keep you stuck — from audience size to budget to time.' },
            { key:'mc_s4_b1',     name:'Session 4 Breakthrough #01', ghl:'mc_01_event_details__29__session_4_breakthrough_01__ex_learn_why_a_big_list_isnt_necessary_for_a_big_payday', type:'text', aiHint:'Ex: Learn why a big list isn\'t necessary for a big payday' },
            { key:'mc_s4_b2',     name:'Session 4 Breakthrough #02', ghl:'mc_01_event_details__30__session_4_breakthrough_02__ex_see_how_to_run_events_without_spending_on_ads', type:'text', aiHint:'Ex: See how to run events without spending on ads' },
            { key:'mc_s4_b3',     name:'Session 4 Breakthrough #03', ghl:'mc_01_event_details__31__session_4_breakthrough_03__ex_discover_why_tech_doesnt_matter_when_the_offer_is_right', type:'text', aiHint:'Ex: Discover why tech doesn\'t matter when the offer is right' },
            { key:'mc_s4_b4',     name:'Session 4 Breakthrough #04', ghl:'mc_01_event_details__32__session_4_breakthrough_04__ex_gain_a_plan_that_works_even_if_youre_starting_from_scratch', type:'text', aiHint:'Ex: Gain a plan that works even if you\'re starting from scratch' },
          ]},
          { label: 'Replays', fields: [
            { key:'mc_main_replay',  name:'Main Event Video Replay',  ghl:'mc_01_event_details__33__main_event_video_replay__ex_httpsyoutube_sdrmtxyz99',  type:'text', aiHint:'YouTube URL for the recorded main session. Ex: https://youtu.be/_sDrMtXyz99' },
            { key:'mc_vip_replay',   name:'VIP Event Video Replay',   ghl:'mc_01_event_details__34__vip_event_video_replay__ex_httpsyoutube_sdrmtaqv45',   type:'text', aiHint:'YouTube URL for the recorded VIP session. Ex: https://youtu.be/_sDrMtAqv45' },
          ]},
        ]
      },

      'about-you': {
        label: 'About You',
        steps: [
          { label: 'Host Details', fields: [
            { key:'mc_host_names',           name:'Event Host Name(s)',         ghl:'mc_02_about_you__01__event_host_name_s__ex_john_smith',         type:'text', aiHint:'Ex: John Smith' },
            { key:'mc_host_singular_plural',  name:'Host Singular vs Plural',   ghl:'mc_02_about_you__02__host_singular_vs_plural__ex_host_or_hosts',  type:'dropdown', options:['host','hosts'], aiHint:'Use "host" for solo, "hosts" for multiple' },
            { key:'mc_biography',             name:'Biography',                  ghl:'mc_02_about_you__03__biography__ex_keep_to_a_few_paragraphs_that_highlights_your_expertise',                type:'textarea', aiHint:'A few paragraphs highlighting your expertise and story' },
          ]},
          { label: 'Pronouns', fields: [
            { key:'mc_pro_04', name:'Pronoun – (Ex: "i" or "we")',          ghl:'mc_02_about_you__04__pronoun__ex_i_or_we', type:'dropdown', options:['i','we'],             aiHint:'Lowercase singular or plural first-person subject' },
            { key:'mc_pro_05', name:'Pronoun – (Ex: "I" or "We")',          ghl:'mc_02_about_you__05__pronoun__ex_i_or_we', type:'dropdown', options:['I','We'],             aiHint:'Uppercase singular or plural first-person subject' },
            { key:'mc_pro_06', name:'Pronoun – (Ex: "i\'m" or "we\'re")',   ghl:'mc_02_about_you__06__pronoun__ex_im_or_were', type:'dropdown', options:["i'm","we're"],       aiHint:'Lowercase contraction' },
            { key:'mc_pro_07', name:'Pronoun – (Ex: "I\'m" or "We\'re")',   ghl:'mc_02_about_you__07__pronoun__ex_im_or_were', type:'dropdown', options:["I'm","We're"],       aiHint:'Uppercase contraction' },
            { key:'mc_pro_08', name:'Pronoun – (Ex: "i\'m a" or "we are")', ghl:'mc_02_about_you__08__pronoun__ex_im_a_or_we_are', type:'dropdown', options:["i'm a","we are"],   aiHint:'Lowercase identifier phrase' },
            { key:'mc_pro_09', name:'Pronoun – (Ex: "I\'m a" or "We are")', ghl:'mc_02_about_you__09__pronoun__ex_im_a_or_we_are', type:'dropdown', options:["I'm a","We are"],   aiHint:'Uppercase identifier phrase' },
            { key:'mc_pro_10', name:'Pronoun – (Ex: "i was" or "we were")', ghl:'mc_02_about_you__10__pronoun__ex_i_was_or_we_were', type:'dropdown', options:["i was","we were"],   aiHint:'Lowercase past tense' },
            { key:'mc_pro_11', name:'Pronoun – (Ex: "I was" or "We were")', ghl:'mc_02_about_you__11__pronoun__ex_i_was_or_we_were', type:'dropdown', options:["I was","We were"],   aiHint:'Uppercase past tense' },
            { key:'mc_pro_12', name:'Pronoun – (Ex: "my" or "our")',        ghl:'mc_02_about_you__12__pronoun__ex_my_or_our', type:'dropdown', options:["my","our"],           aiHint:'Lowercase possessive' },
            { key:'mc_pro_13', name:'Pronoun – (Ex: "My" or "Our")',        ghl:'mc_02_about_you__13__pronoun__ex_my_or_our', type:'dropdown', options:["My","Our"],           aiHint:'Uppercase possessive' },
            { key:'mc_pro_14', name:'Pronoun – (Ex: "myself" or "ourselves")', ghl:'mc_02_about_you__14__pronoun__ex_myself_or_ourselves', type:'dropdown', options:["myself","ourselves"], aiHint:'Reflexive pronoun' },
            { key:'mc_pro_15', name:'Pronoun – (Ex: "me" or "us")',         ghl:'mc_02_about_you__15__pronoun__ex_me_or_us', type:'dropdown', options:["me","us"],           aiHint:'Object pronoun' },
            { key:'mc_pro_16', name:'Pronoun – (Ex: "has" or "have")',      ghl:'mc_02_about_you__16__pronoun__ex_has_or_have', type:'dropdown', options:["has","have"],         aiHint:'Singular or plural verb form' },
            { key:'mc_pro_17', name:'Pronoun – (Ex: "am" or "are")',        ghl:'mc_02_about_you__17__pronoun__ex_am_or_are', type:'dropdown', options:["am","are"],           aiHint:'Singular or plural be-verb' },
          ]},
          { label: 'Company Details', fields: [
            { key:'mc_company_name',   name:'Company Name',            ghl:'mc_02_about_you__18__company_name__ex_my_company_llc',             type:'text', aiHint:'Ex: My Company, LLC' },
            { key:'mc_support_email',  name:'Customer Support Email',  ghl:'mc_02_about_you__19__customer_support_email__ex_supportmycompanycom',   type:'text', aiHint:'Ex: support@mycompany.com' },
            { key:'mc_support_phone',  name:'Customer Support Phone',  ghl:'mc_02_about_you__20__customer_support_phone__ex_7571234567',   type:'text', aiHint:'Ex: 757-123-4567' },
          ]},
          { label: 'Send From Details', fields: [
            { key:'mc_send_from_email', name:'Send From Email',       ghl:'mc_02_about_you__21__send_from_email__ex_memycompanycom',          type:'text', aiHint:'Email participants will see as sender. Ex: me@mycompany.com' },
            { key:'mc_send_from_sig',   name:'Send From Signature',   ghl:'mc_02_about_you__22__send_from_signature__ex_john_s',      type:'text', aiHint:'Signature at bottom of emails/SMS. Ex: John S.' },
          ]},
          { label: 'Legal Details', fields: [
            { key:'mc_legal_state', name:'Legal Action State', ghl:'mc_02_about_you__23__legal_action_state__ex_florida', type:'text', aiHint:'State for legal/terms language. Ex: Florida' },
            { key:'mc_legal_city',  name:'Legal Action City',  ghl:'mc_02_about_you__24__legal_action_city__ex_west_palm_beach',  type:'text', aiHint:'City for legal/terms language. Ex: West Palm Beach' },
          ]},
        ]
      },

      'avatar': {
        label: 'Avatar',
        steps: [
          { label: 'Customer Avatar', fields: [
            { key:'mc_avatar_vertical',          name:'Main Vertical',    ghl:'mc_04_avatar__01__main_vertical__ex_speaking_business_relationships_etc',  type:'text',     aiHint:'Your niche/industry. Ex: Speaking business, Relationships, Health' },
            { key:'mc_avatar_who',               name:'Your WHO',         ghl:'mc_04_avatar__02__your_who__ex_coaches_consultants__speakers',       type:'text',     aiHint:'Your target audience. Ex: coaches, consultants & speakers' },
            { key:'mc_avatar_current_identity',  name:'Current Identity', ghl:'mc_04_avatar__03__current_identity__ex_credit_expert_online_trainer_etc', type:'text',   aiHint:'Who they are NOW (the struggle). Ex: Credit Expert, Online Trainer' },
            { key:'mc_avatar_new_identity',      name:'New Identity',     ghl:'mc_04_avatar__04__new_identity__ex_credit_hero_online_fit_pro_etc',   type:'text',     aiHint:'Who they BECOME (the dream). Ex: Credit Hero, Online Fit Pro' },
          ]},
        ]
      },

      'links': {
        label: 'Links',
        steps: [
          { label: 'Core Funnel Pages', fields: [
            { key:'mc_link_reg_page',    name:'Registration Page',               ghl:'mc_03_links__01__registration_page__ex_httpswwwexamplecomjointhemasterclass',           type:'text', aiHint:'Main registration URL. Ex: https://www.Example.com/JoinTheMasterclass' },
            { key:'mc_link_vip_page',    name:'VIP Experience Page',             ghl:'mc_03_links__02__vip_experience_page__ex_httpswwwexamplecomgovipexperience',         type:'text', aiHint:'VIP upsell page URL. Ex: https://www.Example.com/GoVIPExperience' },
            { key:'mc_link_conf_gen',    name:'General Confirmation Page',       ghl:'mc_03_links__03__general_confirmation_page__ex_httpswwwexamplecommasterclassregistrationconfirmed',   type:'text', aiHint:'Confirmation page for general registrants. Ex: https://www.Example.com/MasterclassRegistrationConfirmed' },
            { key:'mc_link_conf_vip',    name:'VIP Confirmation Page',           ghl:'mc_03_links__04__vip_confirmation_page__ex_httpswwwexamplecomvipmasterclassregistrationconfirmed',       type:'text', aiHint:'Confirmation page for VIP registrants. Ex: https://www.Example.com/VIPMasterclassRegistrationConfirmed' },
            { key:'mc_link_dashboard',   name:'Dashboard',                       ghl:'mc_03_links__05__dashboard__ex_httpswwwexamplecom_dashboard',                   type:'text', aiHint:'Member dashboard URL. Ex: https://www.Example.com/_dashboard' },
            { key:'mc_link_workbook',    name:'Workbook',                        ghl:'mc_03_links__06__workbook__ex_httpswwwdropboxcomsharedfolderexamplelink',                    type:'text', aiHint:'Shared folder or download link. Ex: https://www.Dropbox.com/SharedFolderExampleLink' },
            { key:'mc_link_vip_delivered', name:'VIP Delivered Page',           ghl:'mc_03_links__07__vip_delivered_page__ex_httpswwwexamplecomvipdelivered',          type:'text', aiHint:'Page where VIP bonuses are delivered. Ex: https://www.Example.com/VIP-Delivered' },
            { key:'mc_link_whitelist',   name:'Email Whitelist Instructions Page', ghl:'mc_03_links__15__whitelist_page__ex_httpswwwexamplecomwhitelist',            type:'text', aiHint:'How-to whitelist instructions page. Ex: https://www.Example.com/Whitelist' },
            { key:'mc_link_waitlist_ty', name:'Waiting List Thank You Page',     ghl:'mc_03_links__12__post_challenge_waiting_list_page__ex_httpswwwexamplecomwaitinglistthankyou', type:'text', aiHint:'Post-event waiting list page. Ex: https://www.Example.com/WaitingListThankYou' },
            { key:'mc_link_replays_upgrade', name:'Masterclass Replays Upgrade Page', ghl:'mc_03_links__16__masterclass_replays_upgrade_page__ex_httpswwwexamplecomlifetimereplays', type:'text', aiHint:'Lifetime replay upgrade offer page. Ex: https://www.Example.com/lifetime-replays' },
            { key:'mc_link_terms',       name:'Terms & Conditions Page',         ghl:'mc_03_links__13__terms__conditions_page__ex_httpswwwexamplecomtermsconditions',      type:'text', aiHint:'Ex: https://www.Example.com/Terms-Conditions' },
            { key:'mc_link_privacy',     name:'Privacy Policy Page',             ghl:'mc_03_links__14__privacy_policy_page__ex_httpswwwexamplecomprivacypolicy',         type:'text', aiHint:'Ex: https://www.Example.com/Privacy-Policy' },
          ]},
          { label: 'Application & Deposit', fields: [
            { key:'mc_link_application',    name:'Application Page',             ghl:'mc_03_links__08__application_page__ex_httpswwwexamplecompickme',            type:'text', aiHint:'High-ticket application page. Ex: https://www.Example.com/Pick-Me' },
            { key:'mc_link_app_calendar',   name:'Application Calendar Page',    ghl:'mc_03_links__09__application_calendar_page__ex_httpswwwexamplecompickmecalendar',   type:'text', aiHint:'Book-a-call page for applicants. Ex: https://www.Example.com/Pick-Me-Calendar' },
            { key:'mc_link_deposit',        name:'Deposit Collection Page',      ghl:'mc_03_links__10__deposit_collection_page__ex_httpswwwexamplecomdeposit',     type:'text', aiHint:'Deposit payment page. Ex: https://www.Example.com/Deposit' },
            { key:'mc_link_deposit_conf',   name:'Deposit Confirmation Page',    ghl:'mc_03_links__11__deposit_collection_confirmation__ex_httpswwwexamplecomdepositreceived', type:'text', aiHint:'Post-deposit confirmation. Ex: https://www.Example.com/Deposit-Received' },
            { key:'mc_link_onboarding_cal', name:'Onboarding Calendar Page',     ghl:'mc_03_links__30__onboarding_call_page__ex_httpswwwexamplecomonboardingcalendar',        type:'text', aiHint:'Onboarding call booking page. Ex: https://www.Example.com/Onboarding-Calendar' },
          ]},
          { label: 'Community & Zoom', fields: [
            { key:'mc_link_community',   name:'Community',                       ghl:'mc_03_links__17__community__ex_httpswwwfacebookcomgroupsyourfacebookgroup',                   type:'text', aiHint:'Facebook Group or community URL. Ex: https://www.Facebook.com/Groups/YourFacebookGroup' },
            { key:'mc_link_zoom_main',   name:'Zoom Link – Main Session',        ghl:'mc_03_links__18__zoom_link_main_session__ex_httpszoomusj93979841472',      type:'text', aiHint:'Full Zoom join URL. Ex: https://zoom.us/j/93979841472' },
            { key:'mc_link_zoom_id',     name:'Zoom Link – Main Session (ID Only)', ghl:'mc_03_links__19__zoom_link_main_session_id_only__ex_93979841472', type:'text', aiHint:'Numeric ID only. Ex: 93979841472' },
          ]},
          { label: 'Add to Calendar', fields: [
            { key:'mc_link_cal_main',    name:'Add Main Event To Calendar',      ghl:'mc_03_links__26__add_main_event_to_calendar__ex_httpswwwaddeventcomeventpk18234502',  type:'text', aiHint:'AddEvent.com link. Ex: https://www.addevent.com/event/Pk18234502' },
            { key:'mc_link_cal_vip',     name:'Add VIP Event To Calendar',       ghl:'mc_03_links__27__add_vip_event_to_calendar__ex_httpswwwaddeventcomeventpk18234503',   type:'text', aiHint:'AddEvent.com VIP link. Ex: https://www.addevent.com/event/Pk18234503' },
            { key:'mc_link_cal_wp',      name:'Add Welcome Party Event To Calendar', ghl:'mc_03_links__31__add_welcome_party_event_to_calendar__ex_httpswwwaddeventcomeventpk18234504', type:'text', aiHint:'AddEvent.com Welcome Party link. Ex: https://www.addevent.com/event/Pk18234504' },
          ]},
          { label: 'High-Ticket Offer Docs', fields: [
            { key:'mc_link_ht_doc',      name:'Core Offer Details Document',     ghl:'mc_03_links__29__core_offer_details_document__ex_httpsdocsgooglecomdocumentd1abcdefghijk', type:'text', aiHint:'Google Doc with offer details. Ex: https://docs.google.com/document/d/1AbCDeFgHiJk' },
            { key:'mc_link_wire',        name:'Wire Instructions Document',      ghl:'mc_03_links__30__wire_instructions_document__ex_httpsdocsgooglecomdocumentd1xyzabcdefghij',  type:'text', aiHint:'Google Doc with wire transfer instructions. Ex: https://docs.google.com/document/d/1XyZaBcDeFgHiJ' },
          ]},
          { label: 'VIP Stack Delivery', note: '(*Enter the URL or text participants will see when each VIP bonus is delivered. Can be a link or instruction like "Gain access during VIP training".)', fields: [
            { key:'mc_vip_del_01', name:'VIP Stack #01 Delivered', ghl:'mc_03_links__20__vip_stack_01_delivered__ex_gain_access_during_vip_training', type:'text', aiHint:'Ex: Gain access during VIP training' },
            { key:'mc_vip_del_02', name:'VIP Stack #02 Delivered', ghl:'mc_03_links__21__vip_stack_02_delivered__ex_gain_access_during_vip_training', type:'text', aiHint:'Ex: Gain access during VIP training' },
            { key:'mc_vip_del_03', name:'VIP Stack #03 Delivered', ghl:'mc_03_links__22__vip_stack_03_delivered__ex_httpswwwdropboxcomsharedfolderexamplelink', type:'text', aiHint:'Ex: https://www.Dropbox.com/SharedFolderExampleLink' },
            { key:'mc_vip_del_04', name:'VIP Stack #04 Delivered', ghl:'mc_03_links__23__vip_stack_04_delivered__ex_gain_access_during_vip_training', type:'text', aiHint:'Ex: Gain access during VIP training' },
            { key:'mc_vip_del_05', name:'VIP Stack #05 Delivered', ghl:'mc_03_links__24__vip_stack_05_delivered__ex_gain_access_during_vip_training', type:'text', aiHint:'Ex: Gain access during VIP training' },
            { key:'mc_vip_del_06', name:'VIP Stack #06 Delivered', ghl:'mc_03_links__25__vip_stack_06_delivered__ex_httpsdocsgooglecomspreadsheetsexample', type:'text', aiHint:'Ex: https://docs.google.com/spreadsheets/example' },
          ]},
          { label: 'Replays Delivered', fields: [
            { key:'mc_link_replays_del', name:'Masterclass Replays Delivered',   ghl:'mc_03_links__28__masterclass_replays_delivered__ex_httpswwwdropboxcomshx9gav4x4hbdmy1waadek1akabrxsjp3yqqzdzheadl0', type:'text', aiHint:'Dropbox or drive link to replay folder. Ex: https://www.dropbox.com/sh/x9gav4x4hbdmy1w/...' },
          ]},
        ]
      },

      'copy': {
        label: 'Copy',
        steps: [
          { label: 'Promise', fields: [
            { key:'mc_attention_stmt',   name:'Attention Statement (Pre-Headline)', ghl:'mc_06_copy__01__attention_statement__ex_coaches_ready_to_launch_a_scalable_highticket_offer_fast', type:'text', aiHint:'Short bold opener above the headline. Ex: Coaches looking to break $10k months' },
            { key:'mc_promise',          name:'Headline (Masterclass Promise)',     ghl:'mc_06_copy__02__headline__ex_discover_how_to_craft_a_highticket_offer_that_fuels_a_milliondollar_coaching_businessusing_our_5step_virtual_event_framework',            type:'textarea', aiHint:'Main value proposition headline. Ex: Discover How to Craft a High-Ticket Offer That Fuels a Million-Dollar Coaching Business' },
            { key:'mc_sub_headline',     name:'Subheadline',                        ghl:'mc_06_copy__03__subheadline__ex_without_the_overwhelm_burnout_or_wasted_time_trying_to_do_it_alone',         type:'text', aiHint:'Supporting line under headline. Ex: Without the Overwhelm, Burnout, or Wasted Time Trying to Do It Alone' },
          ]},
          { label: 'System', fields: [
            { key:'mc_process_steps',    name:'Unique Process Steps',   ghl:'mc_06_copy__04__unique_process_steps__ex_5_step_framework',   type:'text', aiHint:'Step count and type. Ex: 5 Step Framework' },
            { key:'mc_process_outcome',  name:'Unique Process Outcome', ghl:'mc_06_copy__05__unique_process_outcome__ex_high_ticket_success', type:'text', aiHint:'What the process achieves. Ex: High Ticket Success' },
            { key:'mc_system_name',      name:'System Name',            ghl:'mc_06_copy__06__system_name__ex_atomic_offer_framework',    type:'text', aiHint:'Branded name of your method. Ex: Atomic Offer Framework' },
            { key:'mc_problem_to_solve', name:'Problem To Solve',       ghl:'mc_06_copy__07__problem_to_solve__ex_generate_high_ticket_clients_without_spending_a_ton_of_money_on_ads_or_doing_1on1_calls',       type:'textarea', aiHint:'Core problem your system solves. Ex: generate high ticket clients without spending a ton of money on ads or doing 1-on-1 calls' },
            { key:'mc_big_desire',       name:'Big Desire',             ghl:'mc_06_copy__18__big_desire__ex_launch_your_first_or_next_6figure_offer_using_a_single_virtual_event',             type:'textarea', aiHint:'Ultimate outcome your clients want. Ex: launch your first or next 6-figure offer using a single virtual event' },
          ]},
          { label: 'Belief Shifts', fields: [
            { key:'mc_old_b1', name:'Old Belief #01', ghl:'mc_06_copy__08__old_belief_01__ex_chasing_clients_all_day', type:'text', aiHint:'Ex: Chasing clients all day' },
            { key:'mc_new_b1', name:'New Belief #01', ghl:'mc_06_copy__09__new_belief_01__ex_clients_come_to_me_ready_to_buy', type:'text', aiHint:'Ex: Clients come to me ready to buy' },
            { key:'mc_old_b2', name:'Old Belief #02', ghl:'mc_06_copy__10__old_belief_02__ex_sales_calls_all_week', type:'text', aiHint:'Ex: Sales calls all week' },
            { key:'mc_new_b2', name:'New Belief #02', ghl:'mc_06_copy__11__new_belief_02__ex_one_offer_sells_to_many_at_once', type:'text', aiHint:'Ex: One offer sells to many at once' },
            { key:'mc_old_b3', name:'Old Belief #03', ghl:'mc_06_copy__12__old_belief_03__ex_confusing_funnels_and_tactics', type:'text', aiHint:'Ex: Confusing funnels and tactics' },
            { key:'mc_new_b3', name:'New Belief #03', ghl:'mc_06_copy__13__new_belief_03__ex_one_simple_system_that_works', type:'text', aiHint:'Ex: One simple system that works' },
            { key:'mc_old_b4', name:'Old Belief #04', ghl:'mc_06_copy__14__old_belief_04__ex_lowticket_burnout', type:'text', aiHint:'Ex: Low-ticket burnout' },
            { key:'mc_new_b4', name:'New Belief #04', ghl:'mc_06_copy__15__new_belief_04__ex_highticket_clarity_and_freedom', type:'text', aiHint:'Ex: High-ticket clarity and freedom' },
            { key:'mc_old_b5', name:'Old Belief #05', ghl:'mc_06_copy__16__old_belief_05__ex_posting_endlessly_for_leads', type:'text', aiHint:'Ex: Posting endlessly for leads' },
            { key:'mc_new_b5', name:'New Belief #05', ghl:'mc_06_copy__17__new_belief_05__ex_strategic_events_that_fill_your_calendar', type:'text', aiHint:'Ex: Strategic events that fill your calendar' },
          ]},
        ]
      },

      'design': {
        label: 'Design',
        steps: [
          { label: 'Brand Color 01 (Funnel Background)', fields: [
            { key:'mc_color_01_darkest', name:'Brand Color 01 Darkest', ghl:'mc_07_design__02__brand_color_01_darkest__ex_081d3a', type:'color', aiHint:'Ex: #081D3A' },
            { key:'mc_color_01_dark',    name:'Brand Color 01 Dark',    ghl:'mc_07_design__03__brand_color_01_dark__ex_0f2c6a',    type:'color', aiHint:'Ex: #0F2C6A' },
            { key:'mc_color_01_light',   name:'Brand Color 01 Light',   ghl:'mc_07_design__04__brand_color_01_light__ex_3d89c9',   type:'color', aiHint:'Ex: #3D89C9' },
          ]},
          { label: 'Brand Color 02 (Buttons & Icons)', fields: [
            { key:'mc_color_02_dark',    name:'Brand Color 02 Dark',    ghl:'mc_07_design__05__brand_color_02_dark__ex_e6a21c',    type:'color', aiHint:'Ex: #E6A21C' },
            { key:'mc_color_02_light',   name:'Brand Color 02 Light',   ghl:'mc_07_design__06__brand_color_02_light__ex_ffdc86',   type:'color', aiHint:'Ex: #FFDC86' },
            { key:'mc_btn_color_text',   name:'Button Color Text',      ghl:'mc_07_design__07__button_color_text__ex_000000',      type:'color', aiHint:'Ex: #000000' },
          ]},
          { label: 'Logo & Images', fields: [
            { key:'mc_offer_logo_light', name:'Offer Logo Light',       ghl:'mc_07_design__11__offer_logo_light__ex_httpsinsertimagelinkjpeg',       type:'upload', hint:'Light version of offer logo · JPG/PNG/JPEG · up to 50MB' },
            { key:'mc_headshot_meet',    name:'Headshot – Meet Your Host(s)', ghl:'mc_07_design__16__meet_your_hosts_headshot__ex_httpsinsertimagelinkjpeg', type:'upload', hint:'Ideal 375px × 400px · JPG/PNG/JPEG · up to 50MB' },
            { key:'mc_headshot_s1',      name:'Headshot – Session #01',  ghl:'mc_07_design__12__headshot_session_01__ex_httpsinsertimagelinkjpeg',   type:'upload', hint:'JPG/PNG/JPEG · up to 50MB' },
            { key:'mc_headshot_s2',      name:'Headshot – Session #02',  ghl:'mc_07_design__13__headshot_session_02__ex_httpsinsertimagelinkjpeg',   type:'upload', hint:'JPG/PNG/JPEG · up to 50MB' },
            { key:'mc_headshot_s3',      name:'Headshot – Session #03',  ghl:'mc_07_design__14__headshot_session_03__ex_httpsinsertimagelinkjpeg',   type:'upload', hint:'JPG/PNG/JPEG · up to 50MB' },
            { key:'mc_headshot_s4',      name:'Headshot – Session #04',  ghl:'mc_07_design__15__headshot_session_04__ex_httpsinsertimagelinkjpeg',   type:'upload', hint:'JPG/PNG/JPEG · up to 50MB' },
            { key:'mc_vip_3d_mockup',    name:'VIP Experience 3D Mockup', ghl:'mc_07_design__17__vip_experience_3d_mockup__ex_httpsinsertimagelinkjpeg', type:'upload', hint:'3D render of VIP bonuses · JPG/PNG/JPEG · up to 50MB' },
          ]},
          { label: 'Page Videos', fields: [
            { key:'mc_video_reg',     name:'Registration Page Video',     ghl:'mc_07_design__18__registration_page_video__ex_httpsyoutube_sdrmtkxw34',     type:'text', aiHint:'YouTube embed URL. Ex: https://youtu.be/_sDrMtKxw34' },
            { key:'mc_video_vip',     name:'VIP Experience Page Video',   ghl:'mc_07_design__19__vip_experience_page_video__ex_httpsyoutube_sdrmteztno',   type:'text', aiHint:'YouTube embed URL. Ex: https://youtu.be/_sDrMteztno' },
            { key:'mc_video_app',     name:'Application Page Video',      ghl:'mc_07_design__20__application_page_video__ex_httpsyoutube_sdrmtbzq87',      type:'text', aiHint:'YouTube embed URL. Ex: https://youtu.be/_sDrMtBzq87' },
            { key:'mc_video_deposit', name:'Deposit Page Video',          ghl:'mc_07_design__21__deposit_page_video__ex_httpsyoutube_sdrmtqv19z',          type:'text', aiHint:'YouTube embed URL. Ex: https://youtu.be/_sDrMtQv19z' },
          ]},
        ]
      },

      'communication': {
        label: 'Communication',
        steps: [
          { label: 'External SMS', note: '(*Choose if you\'d like the system to send text messages to participants in addition to emails.)', fields: [
            { key:'mc_sms_enabled',  name:'Send Text Messages In Addition To Emails?', ghl:'mc_08_communication__01__external_sms__ex_yes_no',        type:'dropdown', options:['Yes','No'], aiHint:'Ex: Yes or No' },
            { key:'mc_sms_opt_out',  name:'SMS Opt Out Keyword (We Suggest "OUT". If You Change This You Must Also Update Workflow MC_09)', ghl:'mc_08_communication__01__sms_opt_out_keyword__ex_out', type:'text', aiHint:'Always use: OUT' },
          ]},
          { label: 'Internal Notifications – Contact', note: '(*The system will notify you when participants take action. Enter your best contact info below.)', fields: [
            { key:'mc_notif_email', name:'Best Email', ghl:'mc_10_notifications__01__best_email__ex_exampleyourcompanycom', type:'text', aiHint:'Ex: example@yourcompany.com' },
            { key:'mc_notif_text',  name:'Best Text',  ghl:'mc_10_notifications__02__best_text__ex_5554461316',  type:'text', aiHint:'Ex: 555-446-1316' },
          ]},
          { label: 'Internal Notifications – Options', note: '(*Choose how to receive each type of notification.)', fields: [
            { key:'mc_notif_registrations', name:'Registrations',          ghl:'mc_10_notifications__03__registrations__ex_email_text_both_none',          type:'dropdown', options:['Email','Text','Both','None'], aiHint:'How to be notified of new registrations' },
            { key:'mc_notif_vip',           name:'VIP',                    ghl:'mc_10_notifications__04__vip__ex_email_text_both_none',                    type:'dropdown', options:['Email','Text','Both','None'], aiHint:'How to be notified of VIP upgrades' },
            { key:'mc_notif_applied',       name:'Applied',                ghl:'mc_10_notifications__05__applied__ex_email_text_both_none',                type:'dropdown', options:['Email','Text','Both','None'], aiHint:'How to be notified of applications' },
            { key:'mc_notif_purchase',      name:'Purchase (Deposit)',     ghl:'mc_10_notifications__06__purchase_deposit__ex_email_text_both_none',       type:'dropdown', options:['Email','Text','Both','None'], aiHint:'How to be notified of deposits' },
            { key:'mc_notif_app_waitlist',  name:'Application Waiting List', ghl:'mc_10_notifications__07__application_waiting_list__ex_email_text_both_none', type:'dropdown', options:['Email','Text','Both','None'], aiHint:'How to be notified of waitlist signups' },
            { key:'mc_notif_next_event',    name:'Next Event Waiting List', ghl:'mc_10_notifications__08__next_event_waiting_list__ex_email_text_both_none', type:'dropdown', options:['Email','Text','Both','None'], aiHint:'How to be notified of next-event waitlist' },
          ]},
        ]
      },

      'vip-upgrade': {
        label: 'VIP Upgrade',
        steps: [
          { label: 'VIP Stack #01', fields: [
            { key:'mc_vip_s01_title',  name:'VIP Stack #01 Title',  ghl:'mc_05_vip__01__vip_stack_01_title__ex_1hour_additional_vip_training',  type:'text', aiHint:'Ex: 1-Hour Additional VIP Training' },
            { key:'mc_vip_s01_result', name:'VIP Stack #01 Result', ghl:'mc_05_vip__02__vip_stack_01_result__ex_join_host_and_the_team', type:'text', aiHint:'Ex: Join HOST and the Team' },
            { key:'mc_vip_del_s01',    name:'VIP Stack #01 Delivery', ghl:'mc_03_links__20__vip_stack_01_delivered__ex_gain_access_during_vip_training', type:'text', aiHint:'Ex: Gain access during VIP training' },
          ]},
          { label: 'VIP Stack #02', fields: [
            { key:'mc_vip_s02_title',  name:'VIP Stack #02 Title',  ghl:'mc_05_vip__03__vip_stack_02_title__ex_priority_live_qa',  type:'text', aiHint:'Ex: Priority Live Q&A' },
            { key:'mc_vip_s02_result', name:'VIP Stack #02 Result', ghl:'mc_05_vip__04__vip_stack_02_result__ex_vips_get_their_questions_answered_first', type:'text', aiHint:'Ex: VIPs Get Their Questions Answered First' },
            { key:'mc_vip_del_s02',    name:'VIP Stack #02 Delivery', ghl:'mc_03_links__21__vip_stack_02_delivered__ex_gain_access_during_vip_training', type:'text', aiHint:'Ex: Gain access during VIP training' },
          ]},
          { label: 'VIP Stack #03', fields: [
            { key:'mc_vip_s03_title',  name:'VIP Stack #03 Title',  ghl:'mc_05_vip__05__vip_stack_03_title__ex_vip_worksheet',  type:'text', aiHint:'Ex: VIP Worksheet' },
            { key:'mc_vip_s03_result', name:'VIP Stack #03 Result', ghl:'mc_05_vip__06__vip_stack_03_result__ex_companion_worksheet_to_help_clarify__structure_your_desired_result', type:'text', aiHint:'Ex: Companion Worksheet To Help Clarify & Structure Your Desired Result' },
            { key:'mc_vip_del_s03',    name:'VIP Stack #03 Delivery', ghl:'mc_03_links__22__vip_stack_03_delivered__ex_httpswwwdropboxcomsharedfolderexamplelink', type:'text', aiHint:'Ex: https://www.Dropbox.com/SharedFolderExampleLink' },
          ]},
          { label: 'VIP Stack #04', fields: [
            { key:'mc_vip_del_s04', name:'VIP Stack #04 Delivery', ghl:'mc_03_links__23__vip_stack_04_delivered__ex_gain_access_during_vip_training', type:'text', aiHint:'Ex: Gain access during VIP training' },
          ]},
          { label: 'VIP Stack #05', fields: [
            { key:'mc_vip_del_s05', name:'VIP Stack #05 Delivery', ghl:'mc_03_links__24__vip_stack_05_delivered__ex_gain_access_during_vip_training', type:'text', aiHint:'Ex: Gain access during VIP training' },
          ]},
          { label: 'VIP Stack #06', fields: [
            { key:'mc_vip_del_s06', name:'VIP Stack #06 Delivery', ghl:'mc_03_links__25__vip_stack_06_delivered__ex_httpsdocsgooglecomspreadsheetsexample', type:'text', aiHint:'Ex: https://docs.google.com/spreadsheets/example' },
          ]},
          { label: 'VIP Price', fields: [
            { key:'mc_vip_price_anchor', name:'VIP Experience Price Anchor', ghl:'mc_05_vip__offer__13__vip_experience_price_anchor__ex_497', type:'text', aiHint:'Crossed-out price. Ex: $497' },
            { key:'mc_vip_price_final',  name:'VIP Experience Final Price',  ghl:'mc_05_vip__offer__14__vip_experience_final_price__ex_97',  type:'text', aiHint:'Actual charge. Ex: $97' },
          ]},
        ]
      },

      'application': {
        label: 'Application',
        steps: [
          { label: 'Qualification Questions', fields: [
            { key:'mc_app_q01', name:'Application Qualifying Question 01', ghl:'mc_05_vip__offer__15__application_qualifying_question_01__ex_whats_your_current_monthly_revenue', type:'textarea', aiHint:'Ex: What\'s your current monthly revenue?' },
            { key:'mc_app_q02', name:'Application Qualifying Question 02', ghl:'mc_05_vip__offer__16__application_qualifying_question_02__ex_do_you_already_have_a_coaching_offer', type:'textarea', aiHint:'Ex: Do you already have a coaching offer?' },
            { key:'mc_app_q03', name:'Application Qualifying Question 03', ghl:'mc_05_vip__offer__17__application_qualifying_question_03__ex_are_you_willing_to_follow_a_proven_system', type:'textarea', aiHint:'Ex: Are you willing to follow a proven system?' },
          ]},
          { label: 'Closing Date', note: '(**The formatted timestamp should be +1 calendar day at 12:00 AM from the actual closing date, which prevents GHL from closing the application prematurely.)', fields: [
            { key:'mc_app_closing_day',  name:'Application Closing DAY',  ghl:'mc_05_vip__offer__25__application_disappearing_day__ex_sunday',  type:'dropdown', options:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], aiHint:'Ex: Sunday' },
            { key:'mc_app_closing_date', name:'Application Closing DATE', ghl:'mc_05_vip__offer__26__application_disappearing_date__ex_jan_7', type:'text', aiHint:'Ex: Jan 7' },
            { key:'mc_app_closing_time', name:'Application Closing TIME', ghl:'mc_05_vip__offer__27__application_disappearing_time__ex_midnight', type:'text', aiHint:'Ex: Midnight' },
            { key:'mc_app_closing_fmt',  name:'Application Closing Formatted (**IMPORTANT – MM-DD-YYYY | 12HR – SET TO +1 DAY AT 12:00 AM)', ghl:'mc_05_vip__offer__28__application_disappearing_day_time_formatted__ex_01082024_1200_am', type:'text', aiHint:'GHL timestamp. Ex: 01-08-2024 12:00 AM' },
          ]},
        ]
      },

      'high-ticket-offer': {
        label: 'High-Ticket Offer',
        steps: [
          { label: 'Offer Details', fields: [
            { key:'mc_ht_title',   name:'High-Ticket Offer Title',   ghl:'mc_05_vip__offer__18__core_offer_title__ex_atomic_offer_accelerator',   type:'text',     aiHint:'Ex: Atomic Offer Accelerator' },
            { key:'mc_ht_outcome', name:'High-Ticket Offer Outcome', ghl:'mc_05_vip__offer__19__core_offer_outcome__ex_learn_how_to_launch_your_next_six_figure_offer', type:'textarea', aiHint:'Ex: learn how to launch your next six figure offer!' },
          ]},
          { label: 'Pricing', fields: [
            { key:'mc_ht_price_total',   name:'High-Ticket Offer Price Total',           ghl:'mc_05_vip__offer__20__core_offer_price_total__ex_10000',              type:'text', aiHint:'Ex: $10,000' },
            { key:'mc_ht_price_deposit', name:'High-Ticket Offer Price Deposit',         ghl:'mc_05_vip__offer__21__core_offer_price_deposit__ex_1000',            type:'text', aiHint:'Ex: $1,000' },
            { key:'mc_ht_balance_after', name:'High-Ticket Offer Balance After Deposit', ghl:'mc_05_vip__offer__2101__core_offer_balance_after_deposit__ex_9000',  type:'text', aiHint:'Ex: $9,000' },
            { key:'mc_ht_balance_01',    name:'Balance Option 01',                       ghl:'mc_05_vip__offer__22__core_offer_balance_option_01__ex_we_have_a_finance_company',        type:'text', aiHint:'Ex: We have a finance company — contact michael@deposyt.com' },
            { key:'mc_ht_balance_02',    name:'Balance Option 02',                       ghl:'mc_05_vip__offer__23__core_offer_balance_option_02__ex_you_can_borrow_money',        type:'text', aiHint:'Ex: You can borrow money from a credit card or personal loan' },
            { key:'mc_ht_balance_03',    name:'Balance Option 03',                       ghl:'mc_05_vip__offer__24__core_offer_balance_option_03__ex_you_would_pay_12_payments',        type:'text', aiHint:'Ex: You would pay 12 payments of $X/month' },
          ]},
        ]
      },

      'testimonials': {
        label: 'Testimonials',
        steps: [
          { label: 'Social Proof #01', fields: [
            { key:'mc_sp01_video',       name:'Social Proof #01 YouTube Video',        ghl:'mc_09_testimonials__01__social_proof_01_youtube_video__ex_httpswwwyoutubecomwatchvq2v5tio3mdil',       type:'text', aiHint:'Ex: https://www.youtube.com/watch?v=Q2v5tio3mdil' },
            { key:'mc_sp01_transcript',  name:'Social Proof #01 Brief Transcription',  ghl:'mc_09_testimonials__02__social_proof_01_brief_transcription__ex_in_just_one_afternoon_i_walked_away_with_a_highticket_offer_im_actually_excited_to_sell', type:'textarea', aiHint:'Ex: In just one afternoon, I walked away with a high-ticket offer I\'m actually excited to sell.' },
            { key:'mc_sp01_name',        name:'Social Proof #01 Name',                 ghl:'mc_09_testimonials__03__social_proof_01_name__ex_daniel_r',                type:'text', aiHint:'First name + last initial. Ex: Daniel R.' },
          ]},
          { label: 'Social Proof #02', fields: [
            { key:'mc_sp02_video',       name:'Social Proof #02 YouTube Video',        ghl:'mc_09_testimonials__04__social_proof_02_youtube_video__ex_httpswwwyoutubecomwatchvq2v5tio3mdil',       type:'text', aiHint:'Ex: https://www.youtube.com/watch?v=Q2v5tio3mdil' },
            { key:'mc_sp02_transcript',  name:'Social Proof #02 Brief Transcription',  ghl:'mc_09_testimonials__05__social_proof_02_brief_transcription__ex_this_masterclass_gave_me_more_clarity_than_months_of_coaching', type:'textarea', aiHint:'Ex: This Masterclass gave me more clarity than months of coaching.' },
            { key:'mc_sp02_name',        name:'Social Proof #02 Name',                 ghl:'mc_09_testimonials__06__social_proof_02_name__ex_chase_b',                type:'text', aiHint:'Ex: Chase B.' },
          ]},
          { label: 'Social Proof #03', fields: [
            { key:'mc_sp03_video',       name:'Social Proof #03 YouTube Video',        ghl:'mc_09_testimonials__07__social_proof_03_youtube_video__ex_httpswwwyoutubecomwatchvq2v5tio3mdil',       type:'text', aiHint:'Ex: https://www.youtube.com/watch?v=Q2v5tio3mdil' },
            { key:'mc_sp03_transcript',  name:'Social Proof #03 Brief Transcription',  ghl:'mc_09_testimonials__08__social_proof_03_brief_transcription__ex_i_finally_packaged_my_expertise_into_something_premium_clients_want_to_buy', type:'textarea', aiHint:'Ex: I finally packaged my expertise into something premium clients want to buy.' },
            { key:'mc_sp03_name',        name:'Social Proof #03 Name',                 ghl:'mc_09_testimonials__09__social_proof_03_name__ex_elieen_w',                type:'text', aiHint:'Ex: Eileen W.' },
          ]},
          { label: 'Social Proof #04', fields: [
            { key:'mc_sp04_video',       name:'Social Proof #04 YouTube Video',        ghl:'mc_09_testimonials__10__social_proof_04_youtube_video__ex_httpswwwyoutubecomwatchvq2v5tio3mdil',       type:'text', aiHint:'Ex: https://www.youtube.com/watch?v=Q2v5tio3mdil' },
            { key:'mc_sp04_transcript',  name:'Social Proof #04 Brief Transcription',  ghl:'mc_09_testimonials__11__social_proof_04_brief_transcription__ex_i_launched_my_first_virtual_event_two_weeks_later__and_closed_18k_in_sales', type:'textarea', aiHint:'Ex: I launched my first virtual event two weeks later — and closed $18k in sales.' },
            { key:'mc_sp04_name',        name:'Social Proof #04 Name',                 ghl:'mc_09_testimonials__12__social_proof_04_name__ex_leonard_p',                type:'text', aiHint:'Ex: Leonard P.' },
          ]},
        ]
      },

      'welcome-party': {
        label: 'Welcome Party',
        steps: [
          { label: 'Welcome Party Details', fields: [
            { key:'mc_wp_day',  name:'Welcome Party Event Day',  ghl:'mc_01_event_details__36__welcome_pary_event_day__ex_monday', type:'dropdown', options:['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], aiHint:'Ex: Monday (note: GHL key has typo "pary" — use as-is)' },
            { key:'mc_wp_date', name:'Welcome Party Event Date', ghl:'mc_01_event_details__37__welcome_party_event_date__ex_jan_15', type:'text', aiHint:'Ex: Jan 15' },
            { key:'mc_wp_time', name:'Welcome Party Event Time', ghl:'mc_01_event_details__38__welcome_party_event_time__ex_8pm_est', type:'text', aiHint:'Ex: 8pm EST' },
          ]},
        ]
      },

    }
  },

  leadmagnet: {
    label: 'Lead Magnet Launchpad',
    icon: '🧲',
    color: '#7daa22',
    sections: {

      'copy': {
        label: 'Copy',
        steps: [
          { label: 'Promise', fields: [
            { key:'lm_attention_stmt', name:'Attention Statement',  ghl:'lm_01_copy__01__attention_statement__ex_for_coaches__consultants_who_are_tired_of_chasing_clients', type:'text',     aiHint:'Ex: For Coaches & Consultants Who Are Tired of Chasing Clients' },
            { key:'lm_headline',       name:'Headline',             ghl:'lm_01_copy__02__headline__ex_get_the_exact_blueprint',            type:'textarea', aiHint:'Ex: Get The Exact Blueprint We Use To Help Coaches Build Authority Fast, Nurture Trust on Autopilot, and Sell Your High-ticket Offer' },
            { key:'lm_subheadline',    name:'Subheadline',          ghl:'lm_01_copy__03__subheadline__ex_without_chasing_burnout_or_tech_overwhelm',         type:'text',     aiHint:'Ex: Without chasing, burnout, or tech overwhelm!' },
            { key:'lm_name',           name:'Lead Magnet Name',     ghl:'lm_01_copy__04__lead_magnet_name__ex_your_authority_ecosystem_blueprint',    type:'text',     aiHint:'Ex: Your Authority Ecosystem Blueprint' },
          ]},
          { label: 'Bullet Point #01', fields: [
            { key:'lm_bp01_idea',    name:'Bullet Point #01 Idea',    ghl:'lm_01_copy__05__bullet_point_01_idea__ex_attract_dream_clients_on_demand',    type:'text',     aiHint:'Short punchy title. Ex: Attract Dream Clients on Demand' },
            { key:'lm_bp01_details', name:'Bullet Point #01 Details', ghl:'lm_01_copy__06__bullet_point_01_details__ex_build_an_ecosystem', type:'textarea', aiHint:'Ex: Build an ecosystem that positions you as the go-to authority so ideal clients come to you, ready to buy.' },
          ]},
          { label: 'Bullet Point #02', fields: [
            { key:'lm_bp02_idea',    name:'Bullet Point #02 Idea',    ghl:'lm_01_copy__07__bullet_point_02_idea__ex_build_trust_on_autopilot',    type:'text',     aiHint:'Ex: Build Trust on Autopilot' },
            { key:'lm_bp02_details', name:'Bullet Point #02 Details', ghl:'lm_01_copy__08__bullet_point_02_details__ex_use_storydriven_systems', type:'textarea', aiHint:'Ex: Use story-driven systems that nurture prospects automatically and make them feel connected before you speak.' },
          ]},
          { label: 'Bullet Point #03', fields: [
            { key:'lm_bp03_idea',    name:'Bullet Point #03 Idea',    ghl:'lm_01_copy__09__bullet_point_03_idea__ex_turn_followers_into_consistent_revenue', type:'text',     aiHint:'Ex: Turn Followers Into Consistent Revenue' },
            { key:'lm_bp03_details', name:'Bullet Point #03 Details', ghl:'lm_01_copy__10__bullet_point_03_details__ex_transform_passive_followers', type:'textarea', aiHint:'Ex: Transform passive followers into loyal fans who join your programs and create predictable monthly income.' },
          ]},
        ]
      },

      'design': {
        label: 'Design',
        steps: [
          { label: 'Lead Magnet Image', fields: [
            { key:'lm_image', name:'Lead Magnet Image', ghl:'lm_02_design__01__lead_magnet_image__ex_httpsinsertimagelinkjpeg', type:'upload', hint:'JPG, PNG, JPEG · up to 50MB' },
          ]},
          { label: 'Brand Color 01', fields: [
            { key:'lm_color_01_darkest', name:'Brand Color 01 Darkest', ghl:'lm_02_design__02__brand_color_01_darkest__ex_081d3a', type:'color', aiHint:'Ex: #081D3A' },
            { key:'lm_color_01_dark',    name:'Brand Color 01 Dark',    ghl:'lm_02_design__03__brand_color_01_dark__ex_0f2c6a',    type:'color', aiHint:'Ex: #0F2C6A' },
            { key:'lm_color_01_light',   name:'Brand Color 01 Light',   ghl:'lm_02_design__04__brand_color_01_light__ex_3d89c9',   type:'color', aiHint:'Ex: #3D89C9' },
          ]},
          { label: 'Brand Color 02', fields: [
            { key:'lm_color_02_dark',  name:'Brand Color 02 Dark',  ghl:'lm_02_design__05__brand_color_02_dark__ex_e6a21c',  type:'color', aiHint:'Ex: #E6A21C' },
            { key:'lm_color_02_light', name:'Brand Color 02 Light', ghl:'lm_02_design__06__brand_color_02_light__ex_ffdc86', type:'color', aiHint:'Ex: #FFDC86' },
          ]},
          { label: 'Logo', fields: [
            { key:'lm_logo_dark',  name:'Brand Logo Dark',  ghl:'lm_02_design__07__brand_logo_dark__ex_httpsinsertimagelinkjpeg',  type:'upload', hint:'Dark version of logo · JPG, PNG, JPEG · up to 50MB' },
            { key:'lm_logo_light', name:'Brand Logo Light', ghl:'lm_02_design__08__brand_logo_light__ex_httpsinsertimagelinkjpeg', type:'upload', hint:'Light version of logo · JPG, PNG, JPEG · up to 50MB' },
          ]},
        ]
      },

      'about-you': {
        label: 'About You',
        steps: [
          { label: 'Company Details', fields: [
            { key:'lm_company_name',  name:'Company Name',            ghl:'lm_03_about_you__01__company_name__ex_my_company_llc',             type:'text', aiHint:'Ex: My Company, LLC' },
            { key:'lm_support_email', name:'Customer Support Email',  ghl:'lm_03_about_you__02__customer_support_email__ex_supportmycompanycom',   type:'text', aiHint:'Ex: support@mycompany.com' },
            { key:'lm_support_phone', name:'Customer Support Phone',  ghl:'lm_03_about_you__03__customer_support_phone__ex_7571234567',   type:'text', aiHint:'Ex: 757-123-4567' },
          ]},
          { label: 'Legal', fields: [
            { key:'lm_legal_state', name:'Legal Action State', ghl:'lm_03_about_you__04__legal_action_state__ex_florida', type:'text', aiHint:'Ex: Florida' },
            { key:'lm_legal_city',  name:'Legal Action City',  ghl:'lm_03_about_you__05__legal_action_city__ex_west_palm_beach',  type:'text', aiHint:'Ex: West Palm Beach' },
          ]},
        ]
      },

      'links': {
        label: 'Links',
        steps: [
          { label: 'Pages', fields: [
            { key:'lm_privacy_page',   name:'Privacy Policy Page',     ghl:'lm_04_links__01__privacy_policy_page__ex_httpswwwexamplecomprivacypolicy',     type:'text', aiHint:'Ex: https://www.Example.com/Privacy-Policy' },
            { key:'lm_terms_page',     name:'Terms & Conditions Page', ghl:'lm_04_links__02__terms__conditions_page__ex_httpswwwexamplecomtermsconditions',  type:'text', aiHint:'Ex: https://www.Example.com/Terms-Conditions' },
            { key:'lm_download_link',  name:'Lead Magnet Download',    ghl:'lm_04_links__03__lead_magnet_download__ex_httpswwwexamplecomtermsconditions',    type:'text', aiHint:'Direct download or delivery URL for the lead magnet' },
          ]},
        ]
      },

    }
  },

  network: {
    label: 'Network Launchpad',
    icon: '🌐',
    color: '#0e9aa7',
    sections: {

      'about-you': {
        label: 'About You',
        steps: [
          { label: 'Name & Title', fields: [
            { key:'net_full_name', name:'Full Name',     ghl:'nw_01_about_you__01__full_name__ex_john_doe', type:'text', aiHint:'Ex: Brendan McCauley' },
            { key:'net_title',     name:'Title',         ghl:'nw_01_about_you__02__title__ex_founder',     type:'text', aiHint:'Ex: Business Development Engineer' },
            { key:'net_tagline',   name:'Tagline',       ghl:'nw_01_about_you__03__tagline__ex_insert_tagline_here',   type:'text', aiHint:'Ex: Every expert deserves to be visible while remaining free from the backstage burden.' },
          ]},
          { label: 'Contact Info', fields: [
            { key:'net_phone', name:'Phone', ghl:'nw_01_about_you__04__phone__ex_7571234567', type:'text', aiHint:'Ex: 757-123-4567' },
            { key:'net_email', name:'Email', ghl:'nw_01_about_you__05__email__ex_namemycompanycom', type:'text', aiHint:'Ex: brendan@growingentrepreneur.com' },
          ]},
          { label: 'Company', fields: [
            { key:'net_company_name', name:'Company Name', ghl:'nw_01_about_you__06__company_name__ex_my_company_llc', type:'text', aiHint:'Ex: My Company, LLC' },
          ]},
        ]
      },

      'buttons': {
        label: 'Buttons',
        steps: [
          ...[1,2,3,4,5,6,7,8,9,10].map(n => {
            const pad = String(n).padStart(2,'0');
            const ti = (n-1)*2+1, li = (n-1)*2+2;
            const tiPad = String(ti).padStart(2,'0'), liPad = String(li).padStart(2,'0');
            return {
              label: `Button Stack #${pad}`,
              fields: [
                { key:`net_btn${pad}_title`, name:`Button Stack #${pad} Title`, ghl:`nw_02_buttons__${tiPad}__button_stack_${pad}_title__ex_my_awesome_free_gift`, type:'text', aiHint:`Button label text. Ex: Join My Upcoming Masterclass` },
                { key:`net_btn${pad}_link`,  name:`Button Stack #${pad} Link`,  ghl:`nw_02_buttons__${liPad}__button_stack_${pad}_link__ex_httpswwwexamplecomfreegift`,  type:'text', aiHint:`Full URL. Ex: https://masterclass.CoachUntangled.com` },
              ]
            };
          })
        ]
      },

      'online-presence': {
        label: 'Online Presence',
        steps: [
          { label: 'Social', fields: [
            { key:'net_linkedin',  name:'LinkedIn URL',  ghl:'nw_03_online_presence__01__linkedin_url__ex_httpswwwlinkedincominyourname',  type:'text', aiHint:'Ex: https://www.linkedin.com/in/theofficialbrendanm' },
            { key:'net_facebook',  name:'Facebook URL',  ghl:'nw_03_online_presence__02__facebook_url__ex_httpswwwfacebookcomyourname',  type:'text', aiHint:'Ex: https://www.facebook.com/officialbrendanm' },
            { key:'net_instagram', name:'Instagram URL', ghl:'nw_03_online_presence__03__instagram_url__ex_httpswwwinstagramcomyourname', type:'text', aiHint:'Ex: https://www.instagram.com/officialbrendanm' },
            { key:'net_youtube',   name:'YouTube URL',   ghl:'nw_03_online_presence__04__youtube_url__ex_httpswwwyoutubecomchannelyourname',   type:'text', aiHint:'Ex: https://www.youtube.com/channel/UCf6mVw_tqiqkHTURQfxrWZg?sub_confirmation=1' },
          ]},
          { label: 'Website & Calendar', fields: [
            { key:'net_website',  name:'Website',  ghl:'nw_03_online_presence__05__website__ex_httpsyoursitecom_',  type:'text', aiHint:'Ex: https://CoachUntangled.com' },
            { key:'net_calendar', name:'Calendar', ghl:'nw_03_online_presence__06__calendar__ex_httpsyoursitecomvirtualcoffee', type:'text', aiHint:'Ex: https://schedulewithbrendan.com' },
          ]},
        ]
      },

      'design': {
        label: 'Design',
        steps: [
          { label: 'Headshot', fields: [
            { key:'net_headshot', name:'Headshot', ghl:'nw_04_design__01__headshot__ex_httpsinsertimagelinkjpeg', type:'upload', hint:'JPG, PNG, JPEG · up to 50MB' },
          ]},
          { label: 'Brand Color 01', fields: [
            { key:'net_color_01_darkest', name:'Brand Color 01 Darkest', ghl:'nw_04_design__02__brand_color_01_darkest__ex_081d3a', type:'color', aiHint:'Ex: #081D3A' },
            { key:'net_color_01_dark',    name:'Brand Color 01 Dark',    ghl:'nw_04_design__03__brand_color_01_dark__ex_0f2c6a',    type:'color', aiHint:'Ex: #0F2C6A' },
            { key:'net_color_01_light',   name:'Brand Color 01 Light',   ghl:'nw_04_design__04__brand_color_01_light__ex_3d89c9',   type:'color', aiHint:'Ex: #3D89C9' },
          ]},
          { label: 'Brand Color 02', fields: [
            { key:'net_color_02_dark',  name:'Brand Color 02 Dark',  ghl:'nw_04_design__05__brand_color_02_dark__ex_e6a21c',  type:'color', aiHint:'Ex: #E6A21C' },
            { key:'net_color_02_light', name:'Brand Color 02 Light', ghl:'nw_04_design__06__brand_color_02_light__ex_ffdc86', type:'color', aiHint:'Ex: #FFDC86' },
            { key:'net_btn_color_text', name:'Button Color Text',    ghl:'nw_04_design__07__button_color_text__ex_000000',    type:'color', aiHint:'Ex: #000000' },
          ]},
        ]
      },

      'qr-codes': {
        label: 'QR Codes',
        steps: [
          { label: 'QR Code Links', fields: [
            { key:'net_qr_link_hub', name:'Link To Link Hub',       ghl:'nw_05_qr_code__01__link_to_link_hub__ex_httpslinksaiprofitlaunchpadioqr5b7kfvrkqpk3',       type:'text', aiHint:'Ex: https://links.aiprofitlaunchpad.io/qr/5B7KFVrkqPK3' },
            { key:'net_qr_vcard',    name:'Link To vCard Download', ghl:'nw_05_qr_code__02__link_to_vcard_download__ex_httpslinksaiprofitlaunchpadioqrectrmeumtlkk', type:'text', aiHint:'Ex: https://links.aiprofitlaunchpad.io/qr/EcTrmEumTLkK' },
            { key:'net_qr_sms',      name:'Link To Direct SMS',     ghl:'nw_05_qr_code__03__link_to_direct_sms__ex_httpslinksaiprofitlaunchpadioqrowosmolwille',     type:'text', aiHint:'Ex: https://links.aiprofitlaunchpad.io/qr/iZI_kY3mf6S8' },
          ]},
        ]
      },

    }
  },

  authority: {
    label: 'Authority Launchpad',
    icon: '⭐',
    color: '#FFBB00',
    sections: {
      'coming-soon': {
        label: 'Coming Soon',
        steps: [
          { label: 'Authority Launchpad', fields: [
            { key:'auth_placeholder', name:'Authority Launchpad — Coming Soon', ghl:'AUTH - Placeholder', type:'textarea' },
          ]},
        ]
      }
    }
  },

};
