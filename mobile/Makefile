ENV ?= Production

publish:
	appcenter codepush release-react -a mate-academy/huntd_$(s) -d $(ENV)

init:
	cp ./.env.sample ./.env
	cp ./.env.sample ./.env.development
